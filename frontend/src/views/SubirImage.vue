import { supabase } from './supabaseClient';

async function uploadImage(file) {
  const { data, error } = await supabase.storage
    .from('images') // Nombre del bucket que creaste
    .upload(`public/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error subiendo la imagen:', error);
    return null;
  }

  console.log('Imagen subida con éxito:', data);
  return data; // Esto contiene la URL o la información del archivo
}
