<!-- <template>
  <div class="mt-5">
    <router-link :to="{ name: 'Home' }" class="rounded-lg text-white p-2 bg-indigo-900 ml-3">Volver</router-link>
  </div>
  <div>
    <h1  class=" text-center">{{ project.name }}</h1>
  </div>
 
  <div class="image-container">
   
     <div>
       <div class="">
         <div class="picZoomer">
           <img class="my_img rounded-lg" :src="selectedImage" alt="Main Image">
         </div>
       </div>
       
       <div class="zoom-thumb">
         <ul class="piclist">
           <li 
             v-for="(image, index) in project.imgUrl" 
             :key="index" 
             @click="updateViewImage(image)"
             :class="{ active: selectedImage === image }"
             class="ml-1"
           >
             <img :src="image" :alt="'Thumbnail ' + index">
           </li>
         </ul>
       </div>
     </div>
  </div>

  <div class="details-container mx-auto mb-12">
    <div class="_product-detail-content">
      <div class="">
        <div class="p-list">
          <h5 class="font-black">Description</h5>
        </div>
        
        <div class="_p-features">
          {{ project.description }}
        </div>
        <h5 class="font-black mt-3">Skills usadas</h5>
        <div class="skills ">
          <div v-for="skill in project.skills"  >
            <p class="font-medium ">{{ skill }}-</p>
          </div>
        </div>
        <div class="_p-qty-and-cart">
          <h5>Project URL</h5>
          <a :href="project.projectUrl" target="_blank" class="!-font-black rounded-lg p-2 underline  decoration-solid"><span style="color: black !important;">Visit the Project</span></a>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template> -->
<template>
  <div class="min-h-screen text-white pt-12 px-4 sm:px-6 lg:px-8">
    <router-link :to="{ name: 'Home' }" class="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
      <i class="fas fa-chevron-left mr-2"></i>
      Volver
    </router-link>

    <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }"
      class="text-4xl font-extrabold text-center mb-12">
      {{ project.name }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <VueTilt class="transform-gpu">
          <div v-motion="{ initial: { opacity: 0, scale: 0.8 }, enter: { opacity: 1, scale: 1 } }">
            <img :src="selectedImage" :alt="project.name" class="rounded-lg shadow-2xl w-full h-auto" />
          </div>
        </VueTilt>
        <div class="flex justify-center mt-4 space-x-2">
          <button
            v-for="(image, index) in project.imgUrl"
            :key="index"
            @click="updateViewImage(image)"
            :class="['w-16 h-16 rounded-md overflow-hidden border-2', { 'border-blue-500': selectedImage === image, 'border-transparent': selectedImage !== image }]"
            v-motion="{ hover: { scale: 1.1 }, tap: { scale: 0.9 } }"
          >
            <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div v-motion="{ initial: { opacity: 0, x: 50 }, enter: { opacity: 1, x: 0 } }" class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Description</h2>
          <p class="text-gray-800">{{ project.description }}</p>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Skills usadas</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in project.skills"
              :key="index"
              v-motion="{ initial: { opacity: 0, scale: 0 }, enter: { opacity: 1, scale: 1 }, transition: { delay: index * 100 } }"
              class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Project URL</h2>
          <a
            :href="project.projectUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Visit Project
            <i class="fas fa-external-link-alt ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  // import VueTilt from 'vue3-tilt'; //no esta funcionando
  import { useMotion } from '@vueuse/motion';
  import { useAppStore } from '../store/appStore';
  import Footer from '../components/Footer.vue';


  const vMotion = useMotion();
  const store = useAppStore();
  const route = useRoute();
  const project = ref({});
  const imageIndex = ref(0);
  const selectedImage = ref('');


  const prevImage = (index) => {
  if (project.value.imgUrl.length > 0 && imageIndex.value > 0) {
    imageIndex.value = (imageIndex.value  - 1) % project.value.imgUrl.length;
  }
};

const nextImage = () => {
  if ( project.value.imgUrl.length > 0) {
    imageIndex.value = (imageIndex.value + 1) % project.value.imgUrl.length;
  }
};

  const updateViewImage = (image) => {
    selectedImage.value = image;
  }


  onMounted(async () => {
    project.value = await store.fetchProjectById(route.params.id);
    selectedImage.value = project.value.imgUrl[0];
    console.log(project.value);
  });
</script>

<style  scoped>
._product-detail-content {
    background: #e1f1f9;
    padding: 15px;
    border: 1px solid lightgray;
    border-radius: 20px;
}


.piclist li{
  margin-top: 10px;
    display: inline-block;
    width: 90px;
    height: auto;
    border: 1px solid #eee;
}
.piclist li.active {
  border-color: #007bff; /* Color del borde activo */
}
.picZoomer .my_img {
  width: 100%;
  height: auto;
}
.piclist li img{
    width: 97%;
    height: auto;
}

.image-container{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
}
.details-container{
  max-width: 50%;
}

@media  (max-width: 768px) {
  .image-container{
    width: 100%;
  }
}

@media  (max-width: 768px) {
  .details-container{
    max-width: 100%;
    margin: 0 10px;
  }
}
.skills {
  display: flex; /* Activar Flexbox */
  flex-wrap: wrap; /* Permitir que los elementos pasen a la siguiente línea si no caben */
  justify-content: start; /* Distribuir uniformemente con espacio alrededor */
  gap: 10px; /* Espacio consistente entre elementos */
  text-align: start;
  align-items: start;
}

</style>