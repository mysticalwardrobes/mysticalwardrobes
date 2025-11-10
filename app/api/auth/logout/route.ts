import { NextResponse } from 'next/server';
import { signOut, clearSessionCookies } from '@/lib/auth-supabase';

export async function POST() {
  try {
    // Sign out from Supabase
    await signOut();
    
    // Clear session cookies
    await clearSessionCookies();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

