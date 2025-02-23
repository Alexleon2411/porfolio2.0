<template>
  <div>
    <div class="w-2/3 ml-5 lg:ml-20 mt-5 flex jutidy-start ">
    <router-link class="rounded-lg text-white p-2 bg-indigo-900" :to="{name: 'Skills'}">Volver</router-link>
  </div>
    <form @submit.prevent="createSkill" class="w-11/12 lg:w-2/5  mx-auto p-8 bg-white shadow-md rounded-lg my-10">
        <h1>Create Skill</h1>
        <div>
          <label for="title" class="block text-sm font-medium text-blue-900">Nombre de la Skill</label>
          <input id="title" v-model="store.skillData.name" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <!-- image skills -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-blue-900">Descripción de la Skill</label>
          <textarea id="description" v-model="store.skillData.description" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required></textarea>
        </div>
        <div class="mb-4">
          <label for="image" class="block text-md font-medium text-blue-900">Imagen de la skill</label>
          <input 
            type="file"
            label="Imagen del Projecto"
            id="image"
            name="image"
            :validation-messages="{ required: 'La imagen de la skill es obligatoria' }"
            accept=".jpg, .jpeg, .png"
            @change="onFileChange"
            />
          <div v-if="previewImages.length"> <!-- si el array contiene algun valor entonces se mostrara la imagen contenida en el array -->
            <h6>Previsualización</h6>
            <div class="image-preview" v-for="(image, index) in previewImages" :key="index">
              <img  :src="image" alt="Imagen de previsualización" class="my-3 rounded-lg"/>
            </div>
          </div>
        </div>
      <button type="submit" class="p-2 rounded-lg text-white" style="background-color: #695aa6;">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import {  ref } from 'vue';
import { useSkillStore } from '../../store/skillsStore';

const store = useSkillStore();
const selectedFile = ref([]);
const previewImages = ref([]);
const skillData = ref(null)


const onFileChange = (e) => {
  console.log('onFileChange', e.target.files);
    selectedFile.value = Array.from(event.target.files);
    previewImages.value = selectedFile.value.map((file) => URL.createObjectURL(file));
    // //falta agregar la logica en el template para mostrar la pre visualizacion de la imagen 
};

const createSkill = async () => {
    if (!selectedFile.value) return;
    try {
        const result = await store.addSkill(selectedFile.value);
    } catch (error) {
        console.error('Error al crear la skill:', error.message);
        alert('Error al crear la skill.');
    }finally{
        selectedFile.value = null;
    }
};
</script>

<style scoped>

</style>