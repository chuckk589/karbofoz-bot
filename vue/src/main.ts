import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from './plugins/axios';
import emitter from './plugins/eventBus';
import dayjs from './plugins/dayjs';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('[v228]__MTUwNDA0NzYwMDAwMA==b6ad7a19dbec1f3b7ba7f0245269f807');
loadFonts();

//eslint-disable-next-line
//@ts-ignore
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$dayjs = dayjs.timezonedDayjs;
app.config.globalProperties.$dayjsPure = dayjs.dayjs;
app.config.globalProperties.$emitter = emitter;
app.mount('#app');

export default app;
