import { defineStore } from "pinia";
import { supabase } from "../config/supabaseClient";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSkillStore = defineStore("skills", () => {

    const router = useRouter()

    const skills = ref([])
    const loading= ref(false)
    const error = ref(null) 
    const skillData = ref({
        name: '',
        description: '',
        "image-url": ''
    })
    
    async function fetchSkills() {
        loading.value = true
        const { data, error: fetchError } = await supabase
            .from('skills')
            .select('*')
        if (fetchError) {
            error.value = fetchError
            return
        }
        skills.value = data
        loading.value = false
        return data
    }

    async function fetchSkill(id) {
        loading.value = true
        const { data, error: fetchError } = await supabase
            .from('skills')
            .select('*')
            .eq('id', id)
        if (fetchError) {
            error.value = fetchError
            return
        }
        skillData.value = data[0]
        loading.value = false
        router.push({name: 'edit-skill', params: {id}})
    }

    async function uploadImage(bucketName, files) {
        const url = []
        const failedFields = []
        try {
            // Iterar sobre cada archivo seleccionado para subirlo al bucket
            for (const file of files) {
                // Subir la imagen al bucket "project-images"
                const { data, error } = await supabase.storage.from(bucketName).upload(`images/${file.name}`, file);
                if (error) {
                    console.error('Error al subir la imagen:', error.message);
                    failedFields.push(file.name);
                    continue;
                }
                // Obtener la URL pública de la imagen subida para enviarla a la base de datos
                const { data: { publicUrl } } = await supabase.storage.from(bucketName).getPublicUrl(data.path);
                if (publicUrl) {
                    url.push(publicUrl);
                }
            }
            return url
        } catch (error) {
            console.error('Error al subir la imagen:', error.message);
            alert('Error al subir la imagen.');
        }
    }

    async function addSkill(file){
        try {
            const imageUrls = await uploadImage('skill-images', file);
            console.log('imageUrls', imageUrls)
            if (!imageUrls) return;
            const { data, error } = await supabase.from('skills').insert([{name: skillData.value.name, description: skillData.value.description, "image-url": imageUrls[0]}])
            if ( error) {
                alert('Error al crear la skill.');
            }
            router.push({name: 'Skills'})
        } catch (error) {
            console.error('Error al crear  la skills:', error.message);
        }
    }

    async function updateSkill( files){
        let imageUrls = []
        if(files.length > 0){
            imageUrls = await uploadImage('skill-images', files);
            skillData.value["image-url"] = imageUrls[0]
            if(!imageUrls) return;
         }
        try {
            const {data, error} = await supabase.from('skills').update([
                {
                    name: skillData.value.name, 
                    description: skillData.value.description, 
                    "image-url": skillData.value["image-url"]
                }]).eq('id', skillData.value.id)
            if(error) throw new error('error updating data')
            // const index = skills.value.findIndex(skill => skill.id === skillData.value.id)
            // if(index !== -1 ){
            //     skills.value[index] = {...skills.value[index], ...data[0]}
            // }
            router.push({name: 'Skills'})
            
        } catch (error) {
            console.error('Error al subir la imagen:', error.message)
        }
    }

    async function deleteSkill(id){
        let skill = {}
        console.log('id', id)
        try {
            const { data:  skillData , error } = await supabase.from('skills').select("*").eq("id", id)
            console.log('data', skillData)
            if(error) return;
        if (skillData)   {
            skill = skillData[0]
            const element = skill["image-url"];
            const filename = element.split('/').pop();
            const { data, error: imagError } = await supabase.storage
              .from('skill-images')
              .remove([`images/${filename}`]);
          
            if (imagError) {
              console.log("Error al eliminar la imagen del bucket:", error.message);
            } else {
              console.log("Imagen eliminada:", data);
            }
            const { data: deleteData, error: deleteError } = await supabase.from('skills').delete().eq('id', id)
            if (deleteError) {
                console.log("Error al eliminar la skill:", deleteError.message);
            } else {
                console.log("Skill eliminada:", deleteData);
                return true
            }
        }
        
        } catch (error) {
            console.error('Error al eliminar la skill:', error.message)
        }
    }

    return {
        skills,
        loading,
        error,
        skillData,
        fetchSkills,
        fetchSkill,
        addSkill,
        updateSkill,
        deleteSkill,
    }
})