<template>

    <div>
         <router-link :to="{ name: 'new-skill' }" class="rounded-lg text-white p-2 bg-indigo-900 ml-3">Agregar Skill</router-link>
    </div>
    <div class="container-porfolio text-center">
      <p class="text-2xl">What the hell I have Done ?</p>
      <h6 class="text-4xl mb-6">KLK mi loco, tamo activo?</h6>
      <div class="section-porfolio">
        <div class="row">
          <div class="col-md-2 project-card" v-for="skill in skills" :key="skill.id">
            <h3>{{ skill.name }}</h3>
             <button @click.stop="fetchskillById(skill.id)" class="mr-2 rounded-lg  text-black  px-1 mb-1"><font-awesome-icon icon="edit" /></button>
            <button @click="deleteskill(skill.id)" class="mr-2 rounded-lg  text-black px-1 mb-2"><font-awesome-icon icon="trash" /></button>
            <div >
              <img 
              :src="skill['image-url']" 
              class="w-1xl object-cover" 
              alt="skill Image"
              >
            </div>
            <div>
              <p class="text-sm">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSkillStore } from '../../store/skillsStore';
import { useRouter } from 'vue-router';


const store = useSkillStore();
const skills = ref([]);
const router = useRouter();


const getSkills = async () => {
  try {
    const result = await store.fetchSkills();
    skills.value = result.map((skill) => {
        return {
            ...skill,
            imageIndex: 0,
        };

      });
      console.log(skills.value);
  } catch (error) {
    console.log(error);
  }
};

const fetchskillById= async (skillId) => {
  try {
    await store.fetchSkill(skillId);
    router.push({ name: 'edit-skill', params: { id: skillId } });
  } catch (error) {
    console.log(error);
  }
}

const deleteskill = async (skillId) => {
  try {
   const result =  await store.deleteSkill(skillId);
    if (result){
      alert('Skill eliminada');
      getSkills();
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
   await getSkills();
});
</script>

<style  scoped>

</style>