import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmail, setSessionCookies } from '@/lib/auth-supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sign in with Supabase
    const { data, error } = await signInWithEmail(email, password);

    if (error || !data?.session) {
      return NextResponse.json(
        { error: error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set session cookies
    await setSessionCookies(
      data.session.access_token,
      data.session.refresh_token
    );

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: data.user.email,
        id: data.user.id,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

