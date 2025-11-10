import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const accessToken = request.cookies.get('sb-access-token')?.value;

    if (!accessToken) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify token with Supabase
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);

      if (error || !user) {
        // Token is invalid, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');
        return response;
      }

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Error verifying token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      return response;
    }
  }

  // Redirect from login page if already authenticated
  if (pathname === '/admin/login') {
    const accessToken = request.cookies.get('sb-access-token')?.value;

    if (accessToken) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: { user }, error } = await supabase.auth.getUser(accessToken);
        
        if (user && !error) {
          // User is authenticated, redirect to admin dashboard
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        // Token is invalid, stay on login page
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

