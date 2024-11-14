import { createClient } from '@supabase/supabase-js';

// Aquí debes poner la URL de tu instancia de Supabase y la clave API (anon key)
const supabaseUrl = 'https://<tu-supabase-url>.supabase.co';
const supabaseKey = '<tu-supabase-key>';

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
