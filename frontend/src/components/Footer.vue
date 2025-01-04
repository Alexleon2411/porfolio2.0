<template>
    <!-- footer -->
    <div class="container">
        <footer class="footer">
            <p class="mb-0">Copyright <span @click="openDialog"> &copy;</span> <a href="https://github.com/Alexleon2411">Alejandro</a></p>
            <div class="social-links text-right m-auto ml-sm-auto">
                <a href="https://www.instagram.com/alejandroleon1124" class="link" target="_blank">
                    <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
                <a href="https://www.linkedin.com/in/leon-jose-alejandro" class="link ml-1" target="_blank">
                    <font-awesome-icon :icon="['fab', 'linkedin']" />
                </a>
                <a href="https://github.com/Alexleon2411" class="link ml-1" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" />
                </a>
            </div>
        </footer>
    </div> <!-- end of page footer -->
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/appStore';


const usuario = ref('');
const store = useAppStore();

const openDialog = () => {
    console.log('openDialog');
    store.openDialog = !store.openDialog;
};

const iniciarSesion = () => {
    alert('Iniciar Sesion');
};
</script>

<style lang="scss" scoped>

</style>
