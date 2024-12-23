<template>
  <router-link :to="{name: 'new-project'}" class="rounded-lg text-white p-2 bg-indigo-900 ml-3 "  >Agregar projecto</router-link>
  <section class="section" id="portfolio">
        <div class="container-porfolio text-center">
          <p class="section-subtitle">What the hell I have Done ?</p>
          <h6 class="section-title mb-6">KLK mi loco, tamo activo?</h6>
            <!-- row -->
             <div class="section-porfolio">
               <div class="row">
                 <div class="col-md-6 project-card" v-for="project in projects" :key="project.id">
                   <h3>{{ project.name }}</h3>
                   <button @click.stop="fetchProjectById(project.id)" class="mr-2 rounded-lg bg-orange-600 text-white p-2 mb-1">edit</button>
                   <button @click="deleteProject(project.id)" class="mr-2 rounded-lg bg-red-600 text-white p-2 mb-2">eliminar</button>
                   <a :href="project.projectUrl" class="portfolio-card" target="_blank" >
                    <div class="relative">
                              <!-- Images for the carousel -->
                        <img 
                          :src="project.imgUrl[currentImageIndex]" 
                          class="portfolio-card-img w-full object-cover" 
                          alt="Project Image"
                        >

                        <!-- Carousel navigation buttons -->
                         <button 
                          @click="prevImage(project.id)"
                          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                          &#60;
                        </button>
                       <!-- <button 
                          @click="nextImage(project.id)"
                          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                          &#62;
                        </button> -->
                    </div>
                     <span class="portfolio-card-overlay">
                       <span class="portfolio-card-caption">
                         <h4 class="mt-3">Skills usadas</h4>
                         <div class="skills-container">
                           <div v-for="skill in project.skills" class="skill-item">
                             <p>{{ skill }}</p>
                            </div>
                          </div>
                        <p class="font-weight-normal mt-3">{{project.description}}</p>
                        <p class="font-weight-normal mt-3">{{project.projectUrl}}</p>
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
const currentImageIndex = ref(0);

const prevImage = (projectId) => {
  const project = projects.value.find((p) => p.id === projectId);
  if (project && project.imgUrl.length > 0) {
    currentImageIndex.value = (currentImageIndex.value - 1 + project.imgUrl.length) % project.imgUrl.length;
  }
}
const getProjects = async () => {
  try {
    const result = await store.getProjects();
    projects.value = result;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    alert('Error al obtener los proyectos.');
  }
}

const fetchProjectById = async (id) => {
  store.fetchStatus = 'update'; // para manejar el router de la funcion fetchProjectById
  try {
    const result = await store.fetchProjectById(id);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error.message);
  }
}

const deleteProject = async (id) => {
  store.fetchStatus = 'delete'; // para manejar el router de la funcion fetchProjectById
  try {
   const result = await store.deleteProject(id);
   if(result){
     alert('Proyecto eliminado correctamente.');
     getProjects();
   }
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error.message);
  }
}

onMounted(() => {
  getProjects();
});
</script>