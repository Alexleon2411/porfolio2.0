import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Encuéntralo en tu panel de Supabase
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Está en la sección "API" de tu proyecto
export const supabase = createClient(supabaseUrl, supabaseKey);


const keepDatabaseAlive = async () => {
    try {
        const { data, error } = await supabase
            .from('project') // Reemplaza con una tabla existente
            .select('*')
            .limit(1);

        if (error) {
            console.error('Error al mantener la base de datos activa:', error);
        } else {
            console.log('Base de datos activa:');
        }
    } catch (err) {
        console.error('Error en keepDatabaseAlive:', err);
    }
};

// Ejecuta la función cada 10 minutos (600,000 milisegundos)
setInterval(keepDatabaseAlive, 600000);

// Opcional: Ejecuta la función inmediatamente al iniciar la aplicación
keepDatabaseAlive();