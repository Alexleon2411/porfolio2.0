<template>
  <PageHeader/>
  <AboutView/>
  <Skills/>
  <Porfolio/>
  <Footer/>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/appStore';
import NavBar from '../components/NavBar.vue'
import PageHeader from '../components/PageHeader.vue'
import AboutView from './AboutView.vue';
import Skills from '../components/Skills.vue';
import Porfolio from '../components/Porfolio.vue';
import Footer from '../components/Footer.vue';

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
