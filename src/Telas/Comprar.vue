<template>
    <Header />
    <div>
        <!-- <Filtro /> -->

        <div class="mx-auto py-12 px-4 sm:px-10 min-h-screen bg-opacity-90">
            <!-- Cabeçalho da Compra -->
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-yellow-400">
                    <i class="fas fa-shopping-cart mr-2"></i>Finalizar Compra
                </h1>
                <router-link to="/" class="text-blue-400 text-xl hover:text-blue-300">
                    <i class="fas fa-arrow-left mr-1"></i> Voltar
                </router-link>
            </div>

            <!-- Card de Resumo da Compra -->
            <div class="bg-[#14141a] rounded-lg p-6 shadow-lg border-l-4 border-yellow-500 mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Detalhes do Servidor -->
                    <div class="bg-[#202029] p-4 rounded-lg">
                        <h3 class="text-lg text-yellow-400 mb-2">
                            <i class="fas fa-server mr-2"></i>Servidor
                        </h3>
                        <p class="text-white">{{ goldListings?.server.serverName }} - {{ goldListings?.faccao }}</p>
                        <p class="text-gray-400">{{ goldListings?.server.game.name }}</p>
                    </div>

                    <!-- Detalhes da Oferta -->
                    <div class="bg-[#202029] p-4 rounded-lg">
                        <h3 class="text-lg text-yellow-400 mb-2">
                            <i class="fas fa-coins mr-2"></i>Oferta Selecionada
                        </h3>
                        <div class="flex justify-between">
                            <div>
                                <p class="text-white">Quantidade Total: <span class="text-yellow-400">{{
                                        goldListings?.qtd }} Gold</span></p>
                                <p class="text-white">Preço por 1K: <span class="text-yellow-400">R$ {{
                                        goldListings?.pricePerK }}</span></p>
                            </div>
                            <div class="text-right">
                                <p class="text-white">Total:</p>
                                <p class="text-2xl font-bold text-yellow-400">R$ {{ ((goldListings?.qtd / 1000) *
                                    goldListings?.pricePerK).toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Card de Resumo da Compra -->
            <div class="bg-[#14141a] rounded-lg p-6 shadow-lg border-l-4 border-yellow-500 mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Seu Pedido</h2>

                <div class="">
                    <form @submit.prevent="createdOrderDeCompra">
                        <!-- Detalhes do Pedido do cliente -->
                        <div class="flex flex-col gap-4">


                            <input v-model="quantidade" type="text" placeholder="Quantidade Desejada"
                                class="p-3 bg-[#202029] text-white text-xl rounded border border-gray-500">
                            <input v-model="charName" type="text" placeholder="Nome do Seu Personagem"
                                class="p-3 bg-[#202029] text-white text-xl rounded border border-gray-500">

                                <br>
                            <div class="flex items-start mb-6">
                                <input id="terms" v-model="acceptedTerms" type="checkbox" class="mt-1 mr-3">
                                <label for="terms" class="text-gray-300">
                                    Li e aceito os <a href="#" class="text-blue-400 hover:underline">Termos de
                                        Serviço</a> e
                                    <a href="#" class="text-blue-400 hover:underline">Política de Privacidade</a>. Estou
                                    ciente que
                                    a compra de gold
                                    é permitida pela Blizzard Entertainment de acordo com os Termos de Uso.
                                </label>
                            </div>
                            <button
                
                                :disabled="!acceptedTerms"
                                class="bg-[#0066CC] cursor-pointer text-xl text-white rounded-md hover:bg-[#0054CC] transition-colors p-3 disabled:bg-gray-500 disabled:cursor-not-allowed">

                                Ir para tela de Pagamento</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Filtro from '../components/Filtro.vue';
import api from '../axios.js';

const route = useRoute();
const goldListingId = route.params.goldListingId;
const goldListings = ref();
console.log(goldListingId);
// Dados da compra
const selectedPayment = ref('pix');
const characterName = ref('');
const selectedRealm = ref('');
const messageToSeller = ref('');
const acceptedTerms = ref(false);

const charName = ref('');
const quantidade = ref();
const linkPaamento = ref('');
async function reqGoldListingsById() {
    try {
        const response = await api.get(`/api/GoldListing/${goldListingId}`);
        goldListings.value = response.data;
        console.log(goldListings.value);
    } catch (error) {
        console.error('Erro ao buscar gold listings:', error);
    }
}

async function createdOrderDeCompra(){
    
    const dados = {
        goldListingId: goldListings.value.goldListingId,
        buyerId: 1,
        charName: charName.value,
        quantity: quantidade.value,
    };
    
    const queryString = new URLSearchParams(dados).toString();
    try{
        const response = await api.post(`/create-checkout-session/start?${queryString}`);
        console.log(response.data);
        linkPaamento.value = response.data.url;
        window.open(linkPaamento.value, '_blank');
    }
    catch (error) {
        console.error('Erro ao criar a ordem de compra:', error);
    }
}

onMounted(() => {
    reqGoldListingsById();
});

</script>

<style scoped></style>