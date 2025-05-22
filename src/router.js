import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Cotacao from './Telas/Cotacao.vue';
import Comprar from './Telas/Comprar.vue';
import Vender from './Telas/Venda.vue';
import ConfirmacaoPagamento from './Telas/confirmacaoPagamento.vue';

const routes = [
  { path: '/', component: Cotacao },
  { path: '/comprar/:goldListingId', component: Comprar },
  { path: '/vender', component: Vender },
  { path: '/sucesso', component: ConfirmacaoPagamento },
  {path: '/cotacao', component: Cotacao},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
