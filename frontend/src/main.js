import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
import { createPinia } from 'pinia';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(router)
app.use(pinia)
app.mount('#app')
