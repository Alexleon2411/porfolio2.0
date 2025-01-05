<template>
  <AdminNavBar/>
  <div>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AdminNavBar from '../../components/AdminNavBar.vue';
</script>

<style lang="scss" scoped>

</style>
