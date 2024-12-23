<template>
  <div class="w-2/3 ml-5 lg:ml-20 mt-5 flex jutidy-start ">
    <router-link :to="{name: 'projects'}" class="rounded-lg text-white p-2 bg-indigo-900" >Volver</router-link>
  </div>
  <form @submit.prevent="editProject" class="w-11/12 lg:w-2/5  mx-auto p-8 bg-white shadow-md rounded-lg my-10">
    <!-- Title -->
     <h3>Editar Projecto</h3>
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

    <!-- url -->
    <div class="mb-4">
      <label for="url" class="block text-sm font-medium text-blue-900">Url del proyecto</label>
      <input v-model="store.projectData.projectUrl" type="text" id="url" class="mt-1 block w-full py-2 px-3 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm" required>
    </div>

    <!-- skills -->
    <div >
      <p class="block text-sm font-medium text-blue-900">skills usadas :</p>
      <div class="flex flex-wrap gap-4  overflow-y-auto h-32 w-full " >
        <div class="flex items-center " v-for="(skill, index ) in skills" :key="index"  >
          <input v-model="selectedCategory" :id="index" :value="skill" type="checkbox" class="h-4 w-4 text-pink-500 border-pink-500 rounded">
          <label :for="skill" class="ml-2 block text-sm text-blue-900">{{ skill }}</label>
        </div>
      </div>
        
      <div class="flex items-center my-2">
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
import { onMounted, ref } from 'vue';
import { useAppStore } from '../../store/appStore';

const store = useAppStore();
const previewImages = ref([]);
const selectedFile = ref([]);
const skills = ref(['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Git', 'GitHub', 'Heroku', 'Netlify', 'Vercel', 'Bootstrap', 'Tailwind CSS', 'Sass', 'Less', 'Stylus', 'BEM', 'Responsive Design', 'Mobile First', 'SEO', 'Web Performance', 'Web Accessibility', 'Progressive Web Apps', 'Single Page Applications', 'Server Side Rendering', 'Static Site Generators', 'Headless CMS', 'JAMstack', 'RESTful APIs', 'GraphQL', 'WebSockets', 'Docker', 'Kubernetes', 'CI/CD', 'TDD', 'BDD', 'Agile', 'Scrum', 'Kanban', 'Lean', 'Design Thinking', 'User Experience', 'User Interface', 'Wireframes', 'Prototypes', 'Mockups', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Logic Pro', 'Ableton Live', 'Pro Tools', 'FL Studio', 'Cubase', 'Reason', 'GarageBand', 'Audacity', 'Sound Forge', 'Audition', 'Max', 'Pure Data', 'SuperCollider', 'ChucK', 'Sonic Pi', 'TidalCycles', 'Gibber', 'Overtone', 'FoxDot', 'Nyquist', 'Csound', 'Chuck', 'Haskell', 'Clojure', 'Erlang', 'Elixir', 'Elm', 'PureScript', 'Scala', 'Kotlin', 'Groovy', 'Grails', 'Micronaut', 'Ratpack', 'Vert.x', 'Spring Boot', 'Quarkus', 'Dropwizard', 'Play Framework', 'Lagom', 'Akka', 'Scalatra', 'Finatra', 'Skinny', 'Spark', 'JHipster', 'Vaadin', 'GWT', 'Apache Wicket', 'Struts', 'JSF', 'PrimeFaces', 'RichFaces', 'IceFaces', 'Apache MyFaces', 'Spring Web Flow', 'Tapestry', 'Grails', 'Ratpack']);
const selectedCategory = ref([]);
const showAddSkill = ref(false);
const newSkill = ref('')

  // Función para agregar imagenes al array que contiene las skilss 
  const addSkill = () => {
      if (newSkill.value && !skills.value.includes(newSkill.value)) {
        skills.value.push(newSkill.value)
        newSkill.value = ''
        showAddSkill.value = false
      }
    }
    // Función para manejar el cambio de archivos y la previsualización de las imágenes
  const handleFileChange = (event) => {
    selectedFile.value = Array.from(event.target.files);
    // Mostrar las imágenes seleccionadas en previsualización
    console.log(selectedFile.value)
    selectedFile.value.forEach((file) => previewImages.value.push(URL.createObjectURL(file)));
  }

  const editProject = async () => {
    try {
      const result = await store.updateProject(selectedCategory.value, selectedFile.value);
      console.log(result);
      alert('Proyecto editado correctamente');
    } catch (error) {
      console.error('Error al editar el proyecto:', error.message);
      alert('Error al editar el proyecto.');
    }
  }


onMounted(() => {
  previewImages.value = store.projectData.imgUrl;
  selectedCategory.value = store.projectData.skills; 

  if(selectedCategory.value.length > 0){
    selectedCategory.value.forEach((skill) => {
      if(!skills.value.includes(skill)) {
        skills.value.push(skill);
      }
    })
  }
});
</script>
