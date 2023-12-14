import { createClient } from '@supabase/supabase-js';
import { anon, publicURL } from '$env/static/private';

export const supabase = createClient(publicURL, anon,{
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });