import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from '../config/supabaseClient';
import { useRouter } from "vue-router";

export const  useAppStore = defineStore('skills', () => {
  const router = useRouter();

  const imageUrl = ref([])
  const projectData = ref({
    name: '',
    description: '',
    skills: [],
    imgUrl:[],
    url: ''
  })

  async function uploadImage(bucketName, files) {
    const url = []
    const failedFields = []
    try {
      // Iterar sobre cada archivo seleccionado para subirlo al bucket
      for ( const file of files) {
        // Subir la imagen al bucket "project-images"
        const { data, error } = await supabase.storage.from(bucketName).upload(`images/${file.name}`, file);
        if (error) {
          console.error('Error al subir la imagen:', error.message);
          failedFields.push(file.name);
          continue;
        }
        // Obtener la URL pública de la imagen subida para enviarla a la base de datos
        const {data: { publicUrl }} = await supabase.storage.from(bucketName).getPublicUrl(data.path);
        if(publicUrl){
         url.push(publicUrl);
        }
      }
      return url
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen.');
    }
  }

  async function createProject(skills, files) {
    const imageUrls = await uploadImage('project-images2', files);
    if(!imageUrl) return;
    const { data, error } = await supabase
      .from('project')
      .insert([
        {
          name: projectData.value.name,
          description: projectData.value.description,
          skills,
          imgUrl: imageUrls
        }
      ])

      if(error){
        console.log(error)
      }else {
        console.log("projecto creado", data)
        router.push({name: 'projects'})
      }
  }

  async function getProjects() {
    const {data, error} = await supabase
      .from('project')
      .select('*')
    if(error){
      console.log(error)
    }else {
      console.log(data)
    }
    return data
  }
  return {
    createProject,
    uploadImage,
    getProjects,
    imageUrl,
    projectData,
  }

})
