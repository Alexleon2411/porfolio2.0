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
    projectUrl: ''
  })

  function defaultValues() {
    projectData.value = {
      name: '',
      description: '',
      skills: [],
      imgUrl:[],
      projectUrl: ''
    }
  }
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
          imgUrl: imageUrls,
          projectUrl: projectData.value.projectUrl
        }
      ])

      if(error){
        console.log(error)
      }else {
        console.log("projecto creado", data)
        defaultValues()
        router.push({name: 'projects'})
      }
  }

  async function fetchProjectById(projectId) {

    const { data, error } = await supabase
      .from('project')
      .select()
      .eq('id', projectId)

    if (error) {
      console.error('Error al obtener el proyecto:', error.message);
      return null;
    }
    console.log('Proyecto obtenido:', data);
    projectData.value = data[0];
    console.log(projectData.value)
    router.push({ name: 'edit-project', params: { id: projectId } });
  
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

  async function updateProject(skills, files) {
    let imageUrls = []
    //verificar si se subieron nuevas imagenes
    if(files.length > 0){
       imageUrls = await uploadImage('project-images2', files);
       projectData.value.imgUrl.push(imageUrls[0])
       if(!imageUrl) return;
    }
    //verificar que las habilidades pasadas desde el componente son diferentes a las que ya tiene el proyecto
    if (skills.length > 0) {
      skills.forEach(element => {
        if(projectData.value.skills.includes(element)){
          console.log("habilidad ya existe")
        }else{
          projectData.value.skills.push(element);
        }
      });
    }
    const { data, error } = await supabase
      .from('project')
      .update({
        name: projectData.value.name,
        description: projectData.value.description,
        skills: projectData.value.skills,
        imgUrl: projectData.value.imgUrl,
        projectUrl: projectData.value.projectUrl
      })
      .eq('id', projectData.value.id)

    if(error){
      console.log(error)
    }else {
      console.log("projecto actualizado", data)
      defaultValues()
      router.push({name: 'projects'})
    }
  }

  async function deleteProject(projectId) {
    let project = {}
    const { data, error } = await supabase
      .from('project')
      .select()
      .eq('id', projectId)
    if(error){
      return console.log(error)
    }
    if (data){
       project = data[0]
    }
    //elimar las imagenes del bucket
    for (const element of project.imgUrl) {
      const filename = element.split('/').pop();
      const { data, error } = await supabase.storage
        .from('project-images2')
        .remove([`images/${filename}`]);
    
      if (error) {
        console.log("Error al eliminar la imagen del bucket:", error.message);
      } else {
        console.log("Imagen eliminada:", data);
      }
    }
    // Después de eliminar las imágenes, eliminar el proyecto
    const { data: projectData, error: projectError } = await supabase
      .from('project')
      .delete()
      .eq('id', projectId);

    if (projectError) {
      console.log("Error al eliminar el proyecto:", projectError.message);
    } else {
     console.log("Proyecto eliminado:", projectData);
      // router.push({ name: 'projects' });
      return true
    }
      }
  return {
    createProject,
    uploadImage,
    getProjects,
    fetchProjectById,
    updateProject,
    deleteProject,
    imageUrl,
    projectData,
  }

}, {
  persist: true,
  strategies: [{
    key: 'appStore',
    storage: sessionStorage
  }]
})
