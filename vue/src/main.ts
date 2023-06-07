import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from './plugins/axios';
import dayjs from './plugins/dayjs';
loadFonts();

//eslint-disable-next-line
//@ts-ignore
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$dayjs = dayjs.timezonedDayjs;
app.config.globalProperties.$dayjsPure = dayjs.dayjs;
app.mount('#app');

export default app;
