<template>
   <!-- portfolio section -->
   <section class="section" id="portfolio">
      <div class="container text-center">
        <p class="section-subtitle">What I Did ?</p>
        <h6 class="section-title mb-6">Portfolio</h6>
      </div><!-- end of container -->
        <!-- row -->
        <div class="porfolio-container flex flex-wrap justify-around">
            <div class="project-card" v-for="project in projects" :key="project.id">
         
                <a  @click="showPojectDetails(project.id)" class="portfolio-card" target="_blank">
                  <img :src="project.imgUrl[0]" class="portfolio-card-img" alt="Project Image">
                  <span class="portfolio-card-overlay">
                      <span class="portfolio-card-caption align-middle text-center">
                          <h4>Web Designing</h4>
                          <p class="font-weight-normal">Click to see project's details</p>
                      </span>
                  </span>
                </a>
            
            </div>
        </div><!-- end of row -->
    </section> <!-- end of portfolio section -->
</template>

<script setup >
  import { useAppStore } from '../store/appStore';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const store = useAppStore();
  const projects = ref([]);

  const showPojectDetails = (projectId) => {
    router.push({ name: 'projects-details', params: { id: projectId } });
  };

  onMounted(async () => {
    projects.value = await store.getProjects();
    console.log("from porfolio",projects.value);
  });

</script>

<style scoped>

.porfolio-container{
  max-width: 90%;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  margin: 20px auto;
}

.project-card{
  margin: 0 10px;
  display: flex;
  max-width: 30%;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
  .porfolio-container{
    width: 100% !important;
    margin: 0 auto;
  }
  
}
@media  (max-width: 768px) {
  .project-card{
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
  
}
</style>
