<template>
  <AdminNavBar v-if="route.name !==  'projects-details'"/>
  <div>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AdminNavBar from '../../components/AdminNavBar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss" scoped>

</style>
