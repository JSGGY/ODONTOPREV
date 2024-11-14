import { createClient } from '@supabase/supabase-js';

// Aquí debes poner la URL de tu instancia de Supabase y la clave API (anon key)
const supabaseUrl = 'https://ibajarvcoxrgaxcqqpyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliYWphcnZjb3hyZ2F4Y3FxcHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NTk1MTgsImV4cCI6MjA0MjUzNTUxOH0.YoEcoUbJzh8_C1XTCirSeFvnPKYFyMIKPvp3FR7jiHc';

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
