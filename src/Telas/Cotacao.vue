<template>
    <Header />

    <div class="mx-auto py-12 px-4 sm:px-10 ">
        <Filtro :servidorCompra="servidorCompra" @set-servidor="servidorCompra = $event" />
        <div class="bg-[#14141a] rounded-lg p-6 shadow-lg mb-8">
            <div class="flex items-center gap-4 mb-8">
                <p class="text-[20px] text-[white] text-yellow-400 mb-2">Facção</p>
                <select v-model="faccaoSelecionada" name="" id=""
                    class="w-150px rounded-sm text-[16px] text-[white] border-none bg-[#202029] px-5 py-4">
                    <option value="">Selecione</option>
                    <option value="Aliança">Aliançe</option>
                    <option value="Horda">Horda</option>
                </select>
            </div>
            
            <div class="flex w-full justify-between bg-gray-500 rounded-lg p-5 shadow-lg text-xl text-white">
                    <p class="flex-2">Versao</p>
                    <p class="flex-1">Servidor</p>
                    <p class="flex-1">Facção</p>
                    <p class="flex-1">Estoque</p>
                    <p class="flex-1">Valor-K</p>
                    <p class="flex-2">Usuario</p>
                </div>
            <div v-for="g in goldListingsFiltrados" :key="g.goldListingId" class="flex items-center gap-3 p-1">
                
                <div class="flex w-full justify-between bg-[#202029] rounded-lg p-5 shadow-lg text-xl text-white">
                    <p class="flex-2">{{ g.server.game.name }}</p>
                    <p class="flex-1">{{ g.server.serverName }}</p>
                    <p :class="[' flex-1', g.faccao === 'Aliança' ? 'text-[#0089CC]' : 'text-red-500']">{{ g.faccao }}</p>
                    <p class="flex-1 text-[#FFD700]">{{ g.qtd }}</p>
                    <p class="flex-1 text-[#FFD700]">{{ g.pricePerK }}</p>
                    <p class="flex-1">{{ g.user.username }}</p>
                </div>
            
                <router-link :to="`/comprar/${g.goldListingId}`" class="cursor-pointer text-xl min-w-[150px] bg-[#0066CC] p-5 text-white rounded-md hover:bg-[#0066CC] transition-colors">
                    <button
                        class="w-full"
                        >
                        Comprar
                    </button>
                </router-link>
            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import Filtro from '../components/Filtro.vue'
import api from '../axios.js'



const gamesVersions = ref()
const servidorCompra = ref("")
const goldListings = ref([])
const faccaoSelecionada = ref("")
function mostrarServidorCompra() {
    console.log(servidorCompra.value)
}



async function reqGoldListings() {
    try {
        const response = await api.get('/api/goldListing')
        goldListings.value = response.data
        console.log(response.data)
    } catch (error) {
        console.error('Erro ao buscar versões de jogos:', error)
    }
}


const goldListingsFiltrados = computed(() => {
    if (servidorCompra.value !== "") {
        return goldListings.value.filter(g => g.server.serverId == servidorCompra.value &&
            (g.faccao == faccaoSelecionada.value || faccaoSelecionada.value == ""))
    } else if (faccaoSelecionada.value !== "") {
        return goldListings.value.filter(g => g.faccao == faccaoSelecionada.value)
    } else {
        return goldListings.value
    }
})


onMounted(() => {
    reqGoldListings()
    // reqGameVersions()
})

</script>