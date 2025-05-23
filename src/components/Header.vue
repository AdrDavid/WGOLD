<template>
    <div class="w-full h-[70px] bg-[#202029] flex items-center pl-4 shadow-lg">
        <div class="text-yellow-400 font-bold text-3xl">WoW Gold Market</div>
        <nav class="ml-auto">
            <ul class="flex text-xl space-x-6 text-white">
                <li class="hover:text-yellow-400 cursor-pointer"><router-link  to="/cotacao"
                        class="hover:text-yellow-400 cursor-pointer">
                        Cotacao</router-link></li>
                <li class="hover:text-yellow-400 cursor-pointer"><router-link to="/vender"
                        class="hover:text-yellow-400 cursor-pointer">
                        Perfil</router-link></li>
                <li v-if="user?.role === 'Admin'" class="hover:text-yellow-400 cursor-pointer"><router-link to="/adm"
                        class="hover:text-yellow-400 cursor-pointer">
                        Admin</router-link></li>
                
            </ul>
        </nav>

        <div class="ml-10 flex items-center h-full gap-4">

            <p class="text-2xl text-[#0066CC] font-bold">{{user?.username}}</p>

            <button @click="logout" class="h-full w-[70px] text-2xl text-white bg-red-400 cursor-pointer hover:bg-red-500 transition-colors">Sair</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios.js'

const router = useRouter()
const user = ref()
function logout() {
    localStorage.removeItem('token')
    router.push('/login')
    // console.log('Logout realizado com sucesso!')
}

async function reqUserLogado(){
    try {
        const response = await api.get('/Auth/validate',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        user.value = response.data
    } catch (error) {
        // console.error('Erro ao buscar usuario logado:', error)
    }
}

onMounted(() => {
    reqUserLogado()
})
</script>

<style scoped></style>