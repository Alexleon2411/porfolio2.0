import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Encuéntralo en tu panel de Supabase
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Está en la sección "API" de tu proyecto
export const supabase = createClient(supabaseUrl, supabaseKey);
