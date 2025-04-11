import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Cotacao from './Telas/Cotacao.vue';
import Comprar from './Telas/Comprar.vue';
import Vender from './Telas/Venda.vue';

const routes = [
  { path: '/', component: Cotacao },
  { path: '/comprar', component: Comprar },
  { path: '/vender', component: Vender }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
