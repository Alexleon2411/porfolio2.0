<template>
 <div
  v-if="isOpen"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
  <div class="bg-white rounded-lg p-6 w-1/3">
    <h2 class="text-lg font-bold mb-4">Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        class="border p-2 mb-4 w-full"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="border p-2 mb-4 w-full"
        required
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Entrar
      </button>
      <button
        type="button"
        @click="closeDialog"
        class="ml-2 text-gray-500 underline"
      >
        Cancelar
      </button>
    </form>
  </div>
</div>
</template>

<script setup>
import {ref} from 'vue'; 
import { useAppStore } from '../store/appStore';

const store = useAppStore();
const email = ref('');
const password = ref('');

const handleLogin = async() => {
  console.log('Iniciar sesión');
  const result = await store.login(email.value, password.value);
  if (!result) {
    alert('Error al iniciar sesión');
  } 
};
</script>

<style scoped>

</style>