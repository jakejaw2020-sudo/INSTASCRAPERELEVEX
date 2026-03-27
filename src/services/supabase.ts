import { createClient } from '@supabase/supabase-js';

function readRequiredEnv(name: string): string {
  const value = import.meta.env[name as keyof ImportMetaEnv];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${name} is not set.`);
  }
  return value;
}

export const supabase = createClient(readRequiredEnv('VITE_SUPABASE_URL'), readRequiredEnv('VITE_SUPABASE_ANON_KEY'));
