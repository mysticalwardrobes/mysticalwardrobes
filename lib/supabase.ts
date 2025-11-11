import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client for use in client components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for admin operations)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      analytics_page_views: {
        Row: {
          id: string;
          path: string;
          created_at: string;
          user_agent: string | null;
          referrer: string | null;
          session_id: string | null;
        };
        Insert: {
          id?: string;
          path: string;
          created_at?: string;
          user_agent?: string | null;
          referrer?: string | null;
          session_id?: string | null;
        };
      };
      analytics_gown_clicks: {
        Row: {
          id: string;
          gown_id: string;
          created_at: string;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          gown_id: string;
          created_at?: string;
          user_agent?: string | null;
        };
      };
      config_featured_gowns: {
        Row: {
          id: string;
          gown_ids: string[];
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          id?: string;
          gown_ids: string[];
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          gown_ids?: string[];
          updated_at?: string;
          updated_by?: string;
        };
      };
    };
  };
}

