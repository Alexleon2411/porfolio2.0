import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from '../config/supabaseClient';

export const  useAppStore = defineStore('skills', () => {


  const imageUrl = ref([])
  const projectData = ref({
    name: '',
    description: '',
    skills: '',
    imgUrl:'',
  })

  async function uploadImage(file) {
    try {
      // Subir la imagen al bucket "project-images"
      const { data, error } = await supabase.storage.from('project-images').upload(`images/${file.name}`, file);
      console.log(data.path)
      if (error) {
        throw error;
      }
      // Obtener la URL pública de la imagen subida
      const {data: { publicUrl }} = await supabase.storage.from('project-images').getPublicUrl(data.path);
      if(publicUrl){
        projectData.value.imgUrl = await publicUrl;
        console.log('Imagen subida con éxito:', publicUrl);
        this.handleSubmit();
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen.');
    }
  }
  async function handleSubmit(params) {

    try {

    } catch (error) {
      console.log('Error while submiting the data',error)
    }
  }

  async function createBucket() {
     // Use the JS library to create a bucket.

    const { data, error } = await supabase.storage.createBucket('avatars')
    console.log(data )

  }
  return {
    uploadImage,
    imageUrl,
    createBucket,
    projectData,
  }

})
