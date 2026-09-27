const SUPABASE_URL = 'https://qtxkqvrpyzecenekywny.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Z6-DGvCjefqGbe_klEPr9Q_lTYnz6A2';

if (!window.supabase) {
  throw new Error('Supabase client library failed to load.');
}

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
