<template>
  <div>
    <router-link :to="{ name: 'projects' }" class="rounded-lg text-white p-2 bg-indigo-900 ml-3">Volver</router-link>
  </div>
  <div>
    <h1  class=" text-center">{{ project.name }}</h1>
  </div>
 
  <div class="image-container">
    <!-- Imagen principal -->
     <div>


       <div class="">
         <div class="picZoomer">
           <img class="my_img rounded-lg" :src="selectedImage" alt="Main Image">
         </div>
       </div>
       <!-- Miniaturas -->
       <div class="zoom-thumb">
         <ul class="piclist">
           <li 
             v-for="(image, index) in project.imgUrl" 
             :key="index" 
             @click="updateViewImage(image)"
             :class="{ active: selectedImage === image }"
           >
             <img :src="image" :alt="'Thumbnail ' + index">
           </li>
         </ul>
       </div>
     </div>
  </div>

  <div class="details-container">
    <div class="_product-detail-content">
      <div class="_p-price-box">
        <div class="p-list">
          <h5 class="font-black">Description</h5>
        </div>
        
        <div class="_p-features">
          {{ project.description }}
        </div>
        <h5 class="font-black mt-3">Skills usadas</h5>
        <div class="skills ">
          <div v-for="skill in project.skills"  >
            <p class="">{{ skill }}</p>
          </div>
        </div>
        <div class="_p-qty-and-cart">
          <h5>Project URL</h5>
          <a :href="project.projectUrl" target="_blank" class="!-font-black rounded-lg p-2 bg-purple-500"><span style="color: black !important;">Project Link</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore } from '../store/appStore';

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
  margin: 10px auto;
  max-width: 50%;
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