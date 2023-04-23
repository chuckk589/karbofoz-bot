import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from './axios';
loadFonts();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.config.globalProperties.$http = axios;

app.mount('#app');

export default app;
