import { supabase, supabaseAdmin } from './supabase';
import { cookies } from 'next/headers';

export interface AuthSession {
  user: {
    id: string;
    email: string;
  };
  access_token: string;
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    return { error: error.message, data: null };
  }

  return { error: null, data };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }

  return { error: null };
}

/**
 * Get the current session from Supabase
 */
export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken) {
      return null;
    }

    // Verify the session with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email || '',
      },
      access_token: accessToken,
    };
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Set session cookies
 */
export async function setSessionCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  
  // Set access token cookie
  cookieStore.set('sb-access-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  // Set refresh token cookie
  cookieStore.set('sb-refresh-token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

/**
 * Clear session cookies
 */
export async function clearSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');
}

/**
 * Check if user is admin (for now, all authenticated users are admins)
 * In future, you can add role-based access control
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Create a new admin user (use this once to create your admin account)
 */
export async function createAdminUser(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm email
  });

  if (error) {
    console.error('Create user error:', error);
    return { error: error.message, data: null };
  }

  return { error: null, data };
}

