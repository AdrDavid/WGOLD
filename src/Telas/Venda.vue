<template>
    <Header />
    <div class="p-6">
        <div>
            <h1 class="text-3xl text-[white] text-yellow-400 mb-2">{{ user?.username }}</h1>
            <!-- <p class="text-[white] text-[16px] mb-4">Bem então vamos começar, para isso vc precisa apenas ter algumas informações cadastradas</p> -->
        </div>
        <div class="p-6 flex flex-wrap gap-4 py-12 bg-[#14141a] rounded-lg w-full min-h-[300px]">
            <div class="w-full flex gap-4">
                <div class="w-[25%] min-w-[220px] h-[250px] bg-[#202029] rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Dados do Usuário</h2>
                <p class="text-xl text-white">Nome: <span class="text-yellow-400">{{ user?.username }}</span></p>
                <p class="text-xl text-white">Email: <span class="text-yellow-400">{{ user?.email }}</span></p>
                <p class="text-xl text-white">Perfil: <span class="text-yellow-400">{{ user?.role }}</span></p>

            </div>
            <div class="w-full h-[250px] bg-[#202029] rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Seus Anuncios</h2>
                <div class=" overflow-y-auto max-h-[180px]">
                    <div v-if="user?.role === 'UserVendedor'" v-for="g in goldListings" :key="g.goldListingId"
                        class="flex items-center gap-3 p-1 ">

                        <div class="flex w-full justify-between bg-[#2e2e2e] rounded-lg p-2 shadow-lg text-xl text-white">
                            <p class="flex-1">{{ g.server.game.name }}</p>
                            <p class="flex-1">{{ g.server.serverName }}</p>
                            <p :class="[' flex-1', g.faccao === 'Aliança' ? 'text-[#0089CC]' : 'text-red-500']">{{ g.faccao
                            }}</p>
                            <p class="flex-1 text-[#FFD700]">{{ g.qtd }}</p>
                            <p class="flex-1 text-[#FFD700]">{{ g.pricePerK }}</p>
                        </div>


                        <button @click="deleteGoldListings(g.goldListingId)"
                            class="cursor-pointer text-xl min-w-[150px] bg-red-400 p-2 text-white rounded-md transition-colors">
                            Apagar
                        </button>
                    </div>
                </div>
                

                <div v-if="user?.role != 'UserVendedor'">
                    <p class="p-2 text-red-400">Ops! seu perfil nao e de vendedor!</p>
                    <p class="p-2 text-blue-400">mas fique tranquilo vc pode se tornar um!</p>
                    <p class="p-2 text-white">Vc vai preencher os dados na stripe e depois vou te mandar um email com
                        mais informacoes sobre seu perfil</p>
                    <button v-if="user?.role === 'UsuarioBase'" @click="upUserParaVendedor"
                        class="cursor-pointer text-xl min-w-[150px] bg-[#0066CC] p-3 text-white rounded-md hover:bg-[#0066CC] transition-colors">Tornar-se
                        um vendedor de gold</button>
                    <p class="p-2 text-blue-400">Aguarde a Aprovacao</p>
                </div>

            </div>
            </div>
            
            <div v-if="user?.role === 'UserVendedor'"
                class="w-full h-[250px] bg-[#202029] rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Novo anuncio</h2>
                <form @submit.prevent="createGoldListings">
                    <Filtro @set-servidor="servidorCompra = $event">
                        <div class="flex justify-between w-full ">
                            <div class="flex  gap-3">
                                <select v-model="faccaoSelecionada" name="" id=""
                                    class="w-[220px] rounded-sm text-[16px] text-[white] border-none bg-[#202029] px-2.5 py-4">
                                    <option value="">Facccao</option>
                                    <option value="Aliança">Aliançe</option>
                                    <option value="Horda">Horda</option>
                                </select>
                                <input v-model="pricePerK" type="number" placeholder="Valor-K" step="0.01"
                                    class="w-[220px] rounded-sm text-[16px] text-[white] border-none bg-[#202029] px-2.5 py-4">
                                <input v-model="qtd" type="number" placeholder="Qtd"
                                    class="w-[220x] rounded-sm text-[16px] text-[white] border-none bg-[#202029] px-2.5 py-4">
                            </div>

                            <button
                                class="cursor-pointer text-xl min-w-[150px] bg-[#0066CC] p-4 text-white rounded-md hover:bg-[#0066CC] transition-colors">Criar</button>
                        </div>
                    </Filtro>

                </form>

            </div>
            <div class="w-full min-h-[250px] bg-[#202029] rounded-lg p-6 shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-white mb-4">Ordens criadas</h2>

                <div v-if="user?.role === 'UserVendedor'" v-for="o in ordersFiltradas" :key="o.orderId"
                    class="flex items-center gap-3 p-1">

                    <div class="flex w-full justify-between bg-[#2e2e2e] rounded-lg p-2 shadow-lg text-xl text-white">
                        <p class="flex-1">{{ o.charName }}</p>
                        <p :class="[' flex-1', o.goldListing.faccao === 'Aliança' ? 'text-[#0089CC]' : 'text-red-500']">{{ o.goldListing.faccao
                        }}</p>
                        <p class="flex-1">{{ o.goldListing.server?.serverName }}</p>
                        <p class="flex-1 text-[#FFD700]">{{ o.quantity }}</p>
                    </div>


                    <!-- <button
                        class="cursor-pointer text-xl min-w-[150px] bg-red-400 p-2 text-white rounded-md transition-colors">
                        Apagar
                    </button> -->
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios.js'
import Header from '../components/Header.vue';
import Filtro from '../components/Filtro.vue'

const user = ref()

const goldListings = ref()
const servidorCompra = ref("")
const faccaoSelecionada = ref("")
const qtd = ref()
const pricePerK = ref()
const linkFormulario = ref()
const orders = ref()
function mostrarServidorCompra() {
    console.log(servidorCompra.value)
}

async function reqUserLogado() {
    try {
        const response = await api.get('/Auth/validate', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        user.value = response.data
        console.log(user.value)
    } catch (error) {
        // console.error('Erro ao buscar usuario logado:', error)
    }
}

async function upUserParaVendedor() {
    try {
        const response = await api.post(`/api/seller/onbording/${user.value.userId}`)
        console.log(response.data)
        linkFormulario.value = response.data.onBordingUrl
        window.open(linkFormulario.value, '_blank')
    }
    catch (error) {
        console.error('Erro ao buscar usuario logado:', error)
    }
}

async function reqGoldListingsByUser() {
    const dados ={
        id: user.value?.userId
    }
    try {
        const response = await api.get(`/user/goldlisting/${user.value.userId}`)
        goldListings.value = response.data
        console.log(response.data)
    } catch (error) {
        console.error('Erro ao buscar Lista:', error)
    }
}
async function createGoldListings() {
    const dados = {
        userId: user.value.userId,
        serverId: servidorCompra.value,
        pricePerK: pricePerK.value,
        qtd: qtd.value,
        faccao: faccaoSelecionada.value
    }
    try {
        const response = await api.post('/api/goldListing', dados)
        console.log(response.data)
        reqGoldListingsByUser()
    } catch (error) {
        // console.error('Erro ao criar goldListing', error)
    }
}

async function deleteGoldListings(id) {
    try {
        const response = await api.delete(`/api/GoldListing/${id}`)
        reqGoldListings()
    } catch (error) {
        console.error('Erro ao buscar versões de jogos:', error)
    }
}
async function reqOrders() {
    try {
        const response = await api.get('/Order')
        console.log(response.data)
        orders.value = response.data
    } catch (error) {
        console.error('Ero ao busar ordens:', error)
    }
}

// const goldListingsFiltrados = computed(() => {
//     if (!goldListings.value || !user.value) return [];
//     return goldListings.value.filter(g => g.user.userId == user.value.userId);
// })
const ordersFiltradas = computed(() => {
    if (!orders.value || !user.value) return [];
    return orders.value.filter(o => o.goldListing.user.userId == user.value.userId);
})




onMounted(async () => {
    await reqUserLogado()
    await reqOrders()
    await reqGoldListingsByUser()
})
</script>