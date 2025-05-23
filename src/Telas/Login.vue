<template>
    <div class="w-full h-screen flex flex-col items-center justify-center">
        <div>
            <h1 class="text-[#FFD700] text-[80px] p-3">--WGOLD--</h1>
        </div>
        <div class="w-[800px] h-[400px] rounded-lg flex gap-10">
            <div class="w-[50%] h-full bg-[#14141a] rounded-lg p-4">
                <h1 class="text-white text-3xl font-bold text-center">Login</h1>
                <form @submit.prevent="Login">
                    <div class="flex flex-col gap-4 pt-10">
                        <input v-model="email" type="text" placeholder="Email"
                            class="p-3 bg-[#202029] text-white rounded border border-gray-500">
                        <input v-model="password" type="password" placeholder="Senha"
                            class="p-3 bg-[#202029] text-white rounded border border-gray-500">
                        <button type="submit"
                            class="bg-[#0066CC] rounded-md cursor-pointer text-xl text-white rounded-md hover:bg-[#0054CC] transition-colors p-3">
                            Entrar
                        </button>
                    </div>
                </form>
                <p v-if="dadosInvalidos" class="text-xl bg-[#f7a3a3] rounded-lg mt-2 p-2 text-red-500 font-bold" > Dados Invalidos </p>
            </div>
            <div class="w-[50%] h-full bg-[#c5c6c7] rounded-lg p-4">
                <h1 class="text-black text-3xl font-bold text-center">Registre-se</h1>
                <form v-if="!confirmacao" @submit.prevent="Registro">
                    <div class="flex flex-col gap-4 pt-10">
                        <input v-model="usuarioCadastro" type="text" placeholder="Usuario"
                            class="p-3 bg-[#fff] text-black rounded border border-gray-300">
                        <input v-model="emailCadastro" type="text" placeholder="Email"
                            class="p-3 bg-[#fff] text-black rounded border border-gray-300">
                        <input v-model="passwordCadastro" type="password" placeholder="Senha"
                            class="p-3 bg-[#fff] text-black rounded border border-gray-300">
                        <button type="submit"
                            class="bg-[#0066CC] rounded-md cursor-pointer text-xl text-white rounded-md hover:bg-[#0054CC] transition-colors p-3">
                            Cadastrar
                        </button>
                        
                    </div>
                </form>
                <p v-if="confirmacao" class="text-3xl text-center mt-10 text-green-600 font-bold" > Cadastro Realizado! <br> Faca login ao lado </p>
                <p v-if="userExistente" class="text-xl bg-[#f7a3a3] rounded-lg mt-2 p-2 text-red-500 font-bold" > Usuario Ja Cadastrado </p>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../axios.js'
import { useRouter } from 'vue-router'
import router from '../router.js'


const route = useRouter()

const email = ref("")
const password = ref("")

const emailCadastro = ref("")
const passwordCadastro = ref("")
const usuarioCadastro = ref("")

const confirmacao = ref(false)

const userExistente = ref(false)
const dadosInvalidos = ref(false)

async function Login(){
    const dados = {
        email: email.value,
        password: password.value
    }

    try{
        const response = await api.post('/Auth/login', dados)
        // console.log(response.data)
        localStorage.setItem('token', response.data.token)

        router.push('/cotacao')
    }
    catch (error) {
        // console.error('Erro ao fazer login:', error)
        if(error.status == 401){
            dadosInvalidos.value = true
        }
    
    }
    
}

async function Registro(){
    const dados = {
        username: usuarioCadastro.value,
        email: emailCadastro.value,
        password: passwordCadastro.value
    }

    try{
        const response = await api.post('/Auth/register', dados)
        // console.log(response.data)
        // localStorage.setItem('token', response.data.token)

        // router.push('/cotacao')
        confirmacao.value = true
        usuarioCadastro.value = ""
        emailCadastro.value = ""
        passwordCadastro.value = ""
        setTimeout(() => {
            confirmacao.value = false
        }, 5000);
    }
    catch (error) {
        // console.error('Erro ao fazer Cadastro:', error)
        if(error.response.data.message == "Usuario ja existe"){
            userExistente.value = true
            setTimeout(() => {
                userExistente.value = false
            }, 5000);
        }
    }
    
}



</script>
