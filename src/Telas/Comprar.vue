<template>
    <div>
        <Header />
        <!-- <Filtro /> -->

        <div class="mx-auto py-12 px-4 sm:px-10 min-h-screen bg-gray-900 bg-opacity-90">
            <!-- Cabeçalho da Compra -->
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-yellow-400">
                    <i class="fas fa-shopping-cart mr-2"></i>Finalizar Compra
                </h1>
                <router-link to="/" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-arrow-left mr-1"></i> Voltar
                </router-link>
            </div>

            <!-- Card de Resumo da Compra -->
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-yellow-500 mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Resumo do Pedido</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Detalhes do Servidor -->
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h3 class="text-lg text-yellow-400 mb-2">
                            <i class="fas fa-server mr-2"></i>Servidor
                        </h3>
                        <p class="text-white">Server 1 (Aliança)</p>
                        <p class="text-gray-400">The War Within</p>
                    </div>

                    <!-- Detalhes da Oferta -->
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h3 class="text-lg text-yellow-400 mb-2">
                            <i class="fas fa-coins mr-2"></i>Oferta Selecionada
                        </h3>
                        <div class="flex justify-between">
                            <div>
                                <p class="text-white">Quantidade: <span class="text-yellow-400">10.000 gold</span></p>
                                <p class="text-white">Preço por 1K: <span class="text-yellow-400">R$ 3,20</span></p>
                            </div>
                            <div class="text-right">
                                <p class="text-white">Total:</p>
                                <p class="text-2xl font-bold text-yellow-400">R$ 32,00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Formulário de Pagamento -->
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">
                    <i class="fas fa-credit-card mr-2"></i>Método de Pagamento
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button v-for="method in paymentMethods" :key="method.id" @click="selectedPayment = method.id"
                        :class="{
                            'border-yellow-500 bg-gray-700': selectedPayment === method.id,
                            'border-gray-600': selectedPayment !== method.id
                        }" class="p-3 border-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                        <!-- <img :src="method.icon" :alt="method.name" class="w-8 h-8 mr-3"> -->
                        <span class="text-white">{{ method.name }}</span>
                    </button>
                </div>

                <div v-if="selectedPayment === 'pix'" class="bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 class="text-lg text-yellow-400 mb-3">Pagamento via PIX</h3>
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        <div class="bg-white p-2 rounded-lg">
                            <img src="https://via.placeholder.com/150" alt="QR Code PIX" class="w-40 h-40">
                        </div>
                        <div>
                            <p class="text-white mb-2">Valor: <span class="text-yellow-400">R$ 32,00</span></p>
                            <p class="text-white mb-4">Chave PIX: <span class="text-blue-400">goldmarket@wow.com</span>
                            </p>
                            <button @click="copyPixKey"
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                                <i class="fas fa-copy mr-2"></i>Copiar Chave
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="selectedPayment === 'mercado-pago'" class="bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 class="text-lg text-yellow-400 mb-3">Mercado Pago</h3>
                    <div class="space-y-4">
                        <input type="text" placeholder="Número do Cartão"
                            class="w-full p-3 bg-gray-600 text-white rounded border border-gray-500">
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Validade"
                                class="p-3 bg-gray-600 text-white rounded border border-gray-500">
                            <input type="text" placeholder="CVV"
                                class="p-3 bg-gray-600 text-white rounded border border-gray-500">
                        </div>
                        <input type="text" placeholder="Nome no Cartão"
                            class="w-full p-3 bg-gray-600 text-white rounded border border-gray-500">
                    </div>
                </div>
            </div>

            <!-- Informações do Personagem -->
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">
                    <i class="fas fa-user mr-2"></i>Informações do Personagem
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-gray-400 mb-2">Nome do Personagem</label>
                        <input v-model="characterName" type="text"
                            class="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                            placeholder="Ex: Arthas">
                    </div>

                    <div>
                        <label class="block text-gray-400 mb-2">Reino</label>
                        <select v-model="selectedRealm"
                            class="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none">
                            <option value="">Selecione o reino</option>
                            <option value="Azralon">Azralon</option>
                            <option value="Nemesis">Nemesis</option>
                            <option value="Goldrinn">Goldrinn</option>
                        </select>
                    </div>
                </div>

                <div class="mt-4">
                    <label class="block text-gray-400 mb-2">Mensagem para o vendedor (opcional)</label>
                    <textarea v-model="messageToSeller"
                        class="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none h-24"
                        placeholder="Ex: Entregar no Banco de Ventobravo"></textarea>
                </div>
            </div>

            <!-- Termos e Finalização -->
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div class="flex items-start mb-6">
                    <input id="terms" v-model="acceptedTerms" type="checkbox" class="mt-1 mr-3">
                    <label for="terms" class="text-gray-300">
                        Li e aceito os <a href="#" class="text-blue-400 hover:underline">Termos de Serviço</a> e
                        <a href="#" class="text-blue-400 hover:underline">Política de Privacidade</a>. Estou ciente que
                        a compra de gold
                        é permitida pela Blizzard Entertainment de acordo com os Termos de Uso.
                    </label>
                </div>

                <button :disabled="!acceptedTerms || !characterName || !selectedRealm" :class="{
                    'bg-green-600 hover:bg-green-700': acceptedTerms && characterName && selectedRealm,
                    'bg-gray-600 cursor-not-allowed': !acceptedTerms || !characterName || !selectedRealm
                }" class="w-full py-3 text-white rounded-lg font-bold transition-colors flex items-center justify-center">
                    <i class="fas fa-lock mr-2"></i> Confirmar Compra
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Filtro from '../components/Filtro.vue';

// Dados da compra
const selectedPayment = ref('pix');
const characterName = ref('');
const selectedRealm = ref('');
const messageToSeller = ref('');
const acceptedTerms = ref(false);

// Métodos de pagamento
const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: 'https://logospng.org/download/pix/logo-pix-icone-512.png' },
    { id: 'mercado-pago', name: 'Mercado Pago', icon: 'https://logospng.org/download/mercado-pago/mercado-pago-512.png' },
    { id: 'boleto', name: 'Boleto', icon: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png' }
];

const copyPixKey = () => {
    navigator.clipboard.writeText('goldmarket@wow.com');
    alert('Chave PIX copiada para a área de transferência!');
};
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui se necessário */
</style>