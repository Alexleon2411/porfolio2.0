<template>
  <router-link :to="{ name: 'new-project' }" class="rounded-lg text-white p-2 bg-indigo-900 ml-3">Agregar projecto</router-link>
  <section class="section" id="portfolio">
    <div class="container-porfolio text-center">
      <p class="section-subtitle">What the hell I have Done ?</p>
      <h6 class="section-title mb-6">KLK mi loco, tamo activo?</h6>
      <div class="section-porfolio">
        <div class="row">
          <div class="col-md-6 project-card" v-for="project in projects" :key="project.id">
            <h3>{{ project.name }}</h3>
            <button @click.stop="fetchProjectById(project.id)" class="mr-2 rounded-lg  text-black  px-1 mb-1"><font-awesome-icon icon="edit" /></button>
            <button @click="deleteProject(project.id)" class="mr-2 rounded-lg  text-black px-1 mb-2"><font-awesome-icon icon="trash" /></button>
            <!-- Carousel navigation buttons -->
            <a class="portfolio-card" @click="showPojectDetails(project.id)">
              <div class="relative">
                <img 
                :src="project.imgUrl[project.imageIndex]" 
                class="portfolio-card-img w-full object-cover" 
                alt="Project Image"
                >
              </div>
              <span class="portfolio-card-overlay">
                <span class="portfolio-card-caption">
                  <h4 class="mt-3">Skills usadas</h4>
                  <div class="skills-container">
                    <div v-for="skill in project.skills" class="skill-item">
                      <p>{{ skill }}</p>
                    </div>
                  </div>
                  <p class="font-weight-normal mt-3">{{ project.description }}</p>
                  <button class="font-weight-normal mt-3"><a :href="project.projectUrl" class="portfolio-card" target="_blank">Link </a></button>
                </span>
              </span>
            </a>
            <div class="mt-1">
              <button 
                @click="prevImage(project.id)"
                class="mx-1 bg-black text-white px-2 rounded-full">
                &#60;
              </button>
              <button 
                @click="nextImage(project.id)"
                class="mx-1 bg-black text-white px-2 rounded-full">
                &#62;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '../../store/appStore';
import { useRouter } from 'vue-router';


const router = useRouter();
const store = useAppStore();
const projects = ref([]);

const getProjects = async () => {
  try {
    const result = await store.getProjects();
    // Agregar `imageIndex` para cada proyecto.
    projects.value = result.map((project) => ({ ...project, imageIndex: 0 }));
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    alert('Error al obtener los proyectos.');
  }
};

const prevImage = (projectId) => {
  const project = projects.value.find((p) => p.id === projectId);
  if (project && project.imgUrl.length > 0) {
    project.imageIndex = (project.imageIndex - 1 + project.imgUrl.length) % project.imgUrl.length;
  }
};

const nextImage = (projectId) => {
  const project = projects.value.find((p) => p.id === projectId);
  if (project && project.imgUrl.length > 0) {
    project.imageIndex = (project.imageIndex + 1) % project.imgUrl.length;
  }
};

const fetchProjectById = async (projectId) => {
  store.fetchStatus = 'update';
  try {
    const data = await store.fetchProjectById(projectId);
    if (data) {
      router.push({ name: 'edit-project', params: { id: projectId } });
    }
    console.log(data);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error.message);
  }
};

const deleteProject = async (id) => {
  store.fetchStatus = 'delete';
  try {
    const result = await store.deleteProject(id);
    if (result) {
      alert('Proyecto eliminado correctamente.');
      getProjects();
    }
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error.message);
  }
};

const showPojectDetails = (projectId) => {
  router.push({ name: 'projects-details', params: { id: projectId } });
};

onMounted(() => {
  getProjects();
});
</script>
