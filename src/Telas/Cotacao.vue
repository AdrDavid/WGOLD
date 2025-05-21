<template>
    <Header />
    
    <div class="mx-auto py-12 px-4 sm:px-10 ">
        <Filtro :servidorCompra="servidorCompra" @set-servidor="servidorCompra = $event" />
        <button @click="mostrarServidorCompra">teste</button>
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
            <div class="flex items-center gap-4 mb-8">
            <p class="text-[20px] text-[white] text-yellow-400 mb-2">Facção</p>
            <select name="" id="" class="w-150px rounded-sm text-[16px] text-[white] border-none bg-[#0066CC] py-[5px] px-[10px] ">
                <option value="">Selecione</option>
                <option value="">Alliance</option>
                <option value="">Horda</option>
            </select>
        </div>
        <div class="w-full bg-gray-700 rounded-lg p-6 shadow-lg mb-8">
            <table class="w-full text-left text-[white] text-lg">
                <thead>
                    <tr class="border-b-2 border-black">
                        <th class="py-2">Servidor</th>
                        <th class="py-2">Facção</th>
                        <th class="py-2">Quantidade</th>
                        <th class="py-2">Valor por "K"</th>
                        <th class="py-2">Vendedor</th>
                        <th class="w-24"></th> <!-- Espaço para o botão -->
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="g in goldListings" class="border-b border-gray-300">
                        <td class="py-2.5">{{ g.serverId }}</td>
                        <td class="py-2.5 text-[#0066CC]">Aliança</td>
                        <td class="py-2.5 text-[#FFD700]">{{g.qtd}}</td>
                        <td class="py-2.5 text-[#FFD700]">{{g.pricePerK }}</td>
                        <td class="py-2.5">{{ g.userId }}</td>
                        <td class="text-center">
                            <router-link to="/comprar" class="bg-[#0066CC]">
                                <button class="cursor-pointer w-24 h-8 bg-[#0066CC] text-white rounded-md hover:bg-[#0066CC] transition-colors">
                                    Comprar
                                </button>
                            </router-link>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>  
        </div>
        
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import Header from '../components/Header.vue'
    import Filtro from '../components/Filtro.vue'
    import api from '../axios.js'



    const gamesVersions = ref()
    const servidorCompra = ref("")
    const goldListings = ref([])
    function mostrarServidorCompra(){
        console.log(servidorCompra.value)
    }
    
    async function reqGoldListings(){
        try {
            const response = await api.get('/api/goldListing')
            goldListings.value = response.data
            console.log(response.data)
        } catch (error) {
            console.error('Erro ao buscar versões de jogos:', error)
        }
    }
    onMounted(() => {
        reqGoldListings()
        // reqGameVersions()
    })

</script>