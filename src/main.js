import { createApp } from 'vue';
import router from './router';
import { createVfm } from 'vue-final-modal';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vue-final-modal/style.css';
import './style.css';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const vfm = createVfm();

createApp(App).use(router).use(pinia).use(vfm).mount('#app');
