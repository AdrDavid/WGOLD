import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Comprar from './components/Comprar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/comprar', component: Comprar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
