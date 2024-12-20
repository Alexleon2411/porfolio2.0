<template>
  <section class="section" id="portfolio">
        <div class="container-porfolio text-center">
          <p class="section-subtitle">What the hell I have Done ?</p>
          <h6 class="section-title mb-6">KLK mi loco, tamo activo?</h6>
            <!-- row -->
             <div class="section-porfolio">

               <div class="row">
                 <div class="col-md-6 project-card" v-for="project in projects" :key="project.id">
                   <h3>{{ project.name }}</h3>
                   <a :href="project.projectUrl" class="portfolio-card" target="_blank">
                     <img v-for="img in project.imgUrl" :src="img" class="portfolio-card-img" alt="Project Image">
                     <span class="portfolio-card-overlay">
                       <span class="portfolio-card-caption">
                         <h4 class="mt-3">Skills usadas</h4>
                         <div class="skills-container">
                           <div v-for="skill in project.skills" class="skill-item">
                           <p>{{ skill }}</p>
                           </div>
                         </div>
                         <p class="font-weight-normal mt-3">{{project.description}}</p>
                       </span>
                     </span>
                   </a>
                 </div>
               </div><!-- end of row -->
           </div><!-- end of container -->
             </div>
    </section> <!-- end of portfolio section -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '../../store/appStore';


const store = useAppStore();
const projects = ref([]);


const getProjects = async () => {
  try {
    const result = await store.getProjects();
    projects.value = result;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    alert('Error al obtener los proyectos.');
  }
}
onMounted(() => {
  getProjects();
});
</script>

<style lang="scss" scoped>

</style>
