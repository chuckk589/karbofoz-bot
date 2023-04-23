import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/WebApp.vue'),
    },
    {
      path: '/template',
      name: 'Template',
      component: () => import('../views/Template.vue'),
    },
  ],
});

export default router;
