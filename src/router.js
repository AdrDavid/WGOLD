import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Cotacao from './Telas/Cotacao.vue';
import Comprar from './Telas/Comprar.vue';
import Vender from './Telas/Venda.vue';
import ConfirmacaoPagamento from './Telas/confirmacaoPagamento.vue';
import Login from './Telas/Login.vue';
import Adm from './Telas/Adm.vue';
const routes = [
  { path: '/', component: Cotacao, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/comprar/:goldListingId', component: Comprar, meta: { requiresAuth: true } },
  { path: '/vender', component: Vender, meta: { requiresAuth: true } },
  { path: '/sucesso', component: ConfirmacaoPagamento, meta: { requiresAuth: true } },
  {path: '/cotacao', component: Cotacao, meta: { requiresAuth: true }},
  {path: '/adm', component: Adm, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) =>{
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token){
        next({path: '/login'});
    }
    else{
        next();
    }
})

export default router;
