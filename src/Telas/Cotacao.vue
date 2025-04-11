<template>
    <Header />
    
    <div class="mx-auto py-12 px-4 sm:px-10 ">
        <Filtro />
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
                    <tr class="border-b border-gray-300">
                        <td class="py-2.5">Server 1</td>
                        <td class="py-2.5 text-[#0066CC]">Aliança</td>
                        <td class="py-2.5 text-[#FFD700]">10.000</td>
                        <td class="py-2.5 text-[#FFD700]">3.20</td>
                        <td class="py-2.5">Vendedor</td>
                        <td class="text-center">
                            <router-link to="/comprar" class="bg-[#0066CC]">
                                <button class="cursor-pointer w-24 h-8 bg-[#0066CC] text-white rounded-md hover:bg-[#0066CC] transition-colors">
                                    Comprar
                                </button>
                            </router-link>
                        </td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <td class="py-2.5">Server 2</td>
                        <td class="py-2.5 text-[#0066CC]">Aliança</td>
                        <td class="py-2.5 text-[#FFD700]">11.000</td>
                        <td class="py-2.5 text-[#FFD700]">2.75</td>
                        <td class="py-2.5">Vendedor</td>
                        <td class="text-center">
                            <router-link to="/comprar" class="bg-[#0066CC]">
                                <button class="cursor-pointer w-24 h-8 bg-[#0066CC] text-white rounded-md hover:bg-[#0066CC] transition-colors">
                                    Comprar
                                </button>
                            </router-link>
                        </td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <td class="py-2.5">Server 3</td>
                        <td class="py-2.5 text-[#0066CC]">Aliança</td>
                        <td class="py-2.5 text-[#FFD700]">9.000</td>
                        <td class="py-2.5 text-[#FFD700]">2.50</td>
                        <td class="py-2.5">Vendedor</td>
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
    import Header from '../components/Header.vue'
    import Filtro from '../components/Filtro.vue'
</script>