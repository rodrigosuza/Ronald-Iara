import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('ERRO CRÍTICO: Variáveis de ambiente do Supabase não encontradas! O site pode não funcionar como esperado na Vercel.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
