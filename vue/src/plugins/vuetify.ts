// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 500,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
