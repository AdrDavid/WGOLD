<template>
    <Header />
    <div class="bg-[#14141a] rounded-lg p-6 shadow-lg mb-8 w-[90%] mx-auto mt-[50px]">
         <div v-for="u in users" :key="u.userId" class="flex items-center gap-3 p-1">
                
                <div class="flex w-full justify-between bg-[#202029] rounded-lg p-5 shadow-lg text-xl text-white">
                    <p class="flex-1">{{ u.username }}</p>
                    <p class="flex-1">{{ u.email}}</p>
                    <p class="flex-1">{{ u.role }}</p>
                    <p class="flex-1">{{ u.chaveVendedor || 'SemChave' }}</p>
                </div>
            
                
                    <button
                        @click="autorizarUser(u.userId)"
                        class="cursor-pointer text-xl min-w-[150px] bg-[#0066CC] p-5 text-white rounded-md hover:bg-[#0066CC] transition-colors"
                        >
                        Aprovar
                    </button>
                
            </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios.js'
import Header from '../components/Header.vue';



const users = ref([])
const username = ref()
const email = ref()
const password = ref()
async function reqUsers() {
    try {
        const response = await api.get('/User', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
        users.value = response.data
    } catch (error) {
        // console.error('Erro ao buscar usuario logado:', error)
    }
}
async function autorizarUser(id) {
   
    try {
        const response = await api.patch(`/User/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
        })
        reqUsers()
        console.log(response.data)
    } catch (error) {
        // console.error('Erro ao buscar usuario logado:', error)
    }
}

onMounted(() => {
    reqUsers()
})
</script>