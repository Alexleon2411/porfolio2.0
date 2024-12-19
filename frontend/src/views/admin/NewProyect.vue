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

  <div class="w-2/3 ml-5 lg:ml-20 mt-5 flex jutidy-start">
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
      @change="onFileChange"
      />

      <div v-if="imageUploaded">
        <p class="font-black"> Imagen Servicio:</p>
        <img :src="url" alt="imagen del servicio" class="w-32">
      </div>
    </div>


    <!-- description del projecto -->
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-blue-900">Descripción del Servicio</label>
      <input v-model="store.projectData.description" type="text" id="description" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required>
    </div>

    <!-- skills -->
    <div class="mb-4">
      <label for="duracion" class="block text-sm font-medium text-blue-900">Duración</label>
      <input v-model="store.projectData.skills" type="text" id="duracion" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required>
    </div>


    <!-- categorias -->
    <div class="mb-4">
      <p class="block text-sm font-medium text-blue-900">Categoría del servicio:</p>
      <div class="flex items-center mt-2">
        <input v-model="selectedCategory" type="radio" id="facial" value="facial" class="h-4 w-4 text-pink-500 border-pink-500 rounded">
        <label for="facial" class="ml-2 block text-sm text-blue-900">Tratamiento facial</label>
      </div>
      <div class="flex items-center mt-2">
        <input v-model="selectedCategory" type="radio" id="masajes" value="masajes" class="h-4 w-4 text-pink-600 border-pink-500 rounded">
        <label for="masajes" class="ml-2 block text-sm text-blue-900">Masajes</label>
      </div>
      <div class="flex items-center mt-2">
        <input v-model="selectedCategory" type="radio" id="enbellecimiento" value="enbellecimiento" class="h-4 w-4 text-pink-600 border-pink-500 rounded">
        <label for="enbellecimiento" class="ml-2 block text-sm text-blue-900">Embellecimiento</label>
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
import { useAppStore } from '../store/appStore';
import NavBar from '../components/NavBar.vue'

  const selectedFile = ref(null); // Archivo seleccionado por el usuario
  const imageUrl = ref(null); // URL pública de la imagen subida
  const loading = ref(false); // Estado de carga
  const store = useAppStore()
  const stillOptions = ['JavaScript, Css, HTML, Tailwinds, Firebase']
  const showAddCategory = ref(false)
  const newCategories = ref('')
  const imageUploaded = ref(false)

  // Manejar el cambio de archivo
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectedFile.value = file;
    }
  };

  const addMoreCategory = (data) => {
    console.log(data)
  }
   const handleSubmit = async () => {
    console.log('from handleSubmit')
   }

  const uploadImage = async () => {
    if (!selectedFile.value) return;
    loading.value = true;
    try {
      // // Subir la imagen al bucket "project-images"
      const result = await store.uploadImage(selectedFile.value)
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
