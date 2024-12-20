<template>
  <!-- <div class="mx-auto flex justify-center">
    <div>
      <div class="bg-white shadow p-3">
        <h1 class="text-6xl">Register New project</h1>
        <form @submit.prevent="uploadImage" class="">
          <div class="w-full my-4">
            <input type="text" placeholder="Name" class="rounded bg-slate-300 font-serif p-1 border-separate mb-3 font-black">
          </div>
          <div>
            <h2 class="">Subir Imagen</h2>
            <input type="file" @change="onFileChange" accept="image/*" />
          </div>
          <div class="my-2">
            <button type="submit" :disabled="!selectedFile || loading" class="rounded bg-slate-300 p-2">
              {{ loading ? "Subiendo..." : "Subir Imagen" }}
            </button>
          </div>
        </form>

        <div v-if="imageUrl" class="image-preview">
          <h2>Imagen Subida:</h2>
          <img :src="imageUrl" alt="Imagen subida" />
        </div>
      </div>
  </div> -->

  <div class="w-2/3 ml-5 lg:ml-20 mt-5 flex jutidy-start ">
    <router-link class="rounded-lg text-white p-2 bg-indigo-900" >Volver</router-link>
  </div>
  <form @submit.prevent="handleSubmit" class="w-11/12 lg:w-2/5  mx-auto p-8 bg-white shadow-md rounded-lg my-10">
    <!-- Title -->
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-blue-900">Nombre del Projecto </label>
      <input v-model="store.projectData.name" type="text" id="title" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required>
    </div>
    
    <!-- imagen del producto -->
    <div class=" mb-5">
      <label for="image" class="block text-md font-medium text-blue-900">Imagen del Projecto</label>
        <input
          type="file"
          label="Imagen del Projecto"
          id="image"
          name="image"
          :validation-messages="{ required: 'La imagen del producto es obligatoria' }"
          accept=".jpg, .jpeg, .png"
          multiple
          @change="handleFileChange"
        />

      <div v-if="previewImages.length"> <!-- si el array contiene algun valor entonces se mostrara la imagen contenida en el array -->
        <h6>Previsualización</h6>
        <div class="image-preview" v-for="(image, index) in previewImages" :key="index">
          <img  :src="image" alt="Imagen de previsualización" class="my-3 rounded-lg"/>
        </div>
      </div>
    </div>

    <!-- description del projecto -->
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-blue-900">Descripción del Servicio</label>
      <input v-model="store.projectData.description" type="text" id="description" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required>
    </div>

    <!-- skills -->
    <div class="mb-4">
      <p class="block text-sm font-medium text-blue-900">skills usadas :</p>
      <div class="flex items-center mt-2" v-for="skill in skills" :key="skill">
        <input v-model="selectedCategory" :id="skill" :value="skill" type="checkbox" class="h-4 w-4 text-pink-500 border-pink-500 rounded">
        <label :for="skill" class="ml-2 block text-sm text-blue-900">{{ skill }}</label>
      </div>
      <div class="flex items-center mt-2">
        <button type="button" @click="showAddSkill = true" class="text-blue-500 hover:underline">Agregar nueva skill</button>
      </div>
      <div v-if="showAddSkill" class="mt-2">
        <input v-model="newSkill" type="text" placeholder="Nueva skill" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm">
        <button type="button" @click="addSkill" class="mt-2 py-2 px-4 bg-indigo-900 text-white rounded-md">Agregar</button>
      </div>
    </div>

    <!-- Submit Button -->
    <div>
      <button type="submit" class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-900 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../../store/appStore';
import NavBar from '../../components/NavBar.vue'

const selectedFile = ref([]); // Archivo seleccionado por el usuario
const imageUrl = ref(null); // URL pública de la imagen subida
const loading = ref(false); // Estado de carga
const store = useAppStore()
const stillOptions = ['JavaScript, Css, HTML, Tailwinds, Firebase']
const showAddCategory = ref(false)
const newCategories = ref('')
const imageUploaded = ref(false)
const showAddSkill = ref(false)
const newSkill = ref('')
const skills = ref(['JavaScript', 'HTML', 'CSS', 'Tailwinds CSS'])
const selectedCategory = ref([])
const previewImages = ref([]) 

/// methods

  const addSkill = () => {
    if (newSkill.value && !skills.value.includes(newSkill.value)) {
      skills.value.push(newSkill.value)
      newSkill.value = ''
      showAddSkill.value = false
    }
  }

  // Manejar el cambio de archivo
  const handleFileChange = (event) => {
    selectedFile.value = Array.from(event.target.files);
    // Mostrar las imágenes seleccionadas en previsualización
    console.log(selectedFile.value)
    previewImages.value = selectedFile.value.map((file) => URL.createObjectURL(file));
    console.log(event.target.files);
  }

  const addMoreCategory = (data) => {
    console.log(data);
  }

  const handleSubmit = async () => {
    if (!selectedFile.value) return;
    loading.value = true;
    try {
      // // Subir la imagen al bucket "project-images"
      const result = await store.createProject(selectedCategory.value,selectedFile.value)
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen.');
    } finally {
      loading.value = false;
      selectedFile.value = null;
    }
  }

  const uploadImage = async () => {
    if (!selectedFile.value) return;
    loading.value = true;
    try {
      // // Subir la imagen al bucket "project-images"
      const result = await store.createProject(selectedFile.value)
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen.');
    } finally {
      loading.value = false;
      selectedFile.value = null;
    }
  };
</script>

<style lang="scss" scoped>

</style>
