import { createClient } from '@supabase/supabase-js';
import { PUBLIC_ANON, PUBLIC_URL } from '$env/static/public';

export const supabase = createClient(PUBLIC_URL, PUBLIC_ANON,{
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });