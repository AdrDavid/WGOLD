<template>
    <div class="w-full bg-[#14141a] rounded-lg p-[7px] shadow-lg mb-8  flex  gap-2.5">
        <select @change="handleGameVersionChange"
            class="w-[220px] rounded-sm bg-[#202029] rounded-lg p-[7px] shadow-lg text-[16px] text-[white] border-none px-2.5 py-4">
            <option value="">Expansão</option>
            <option v-for="versao in gamesVersions" :value="versao.gameId" :key="versao.gameId">
                {{ versao.gameId }}-{{ versao.name }}</option>
        </select>
        <select @change="$emit('set-servidor', $event.target.value)"
            class="w-[220px] rounded-sm text-[16px] bg-[#202029] rounded-lg p-[7px] shadow-lg text-[white]  border-none px-2.5 py-4 ">
            <option value="">Escolha o Servidor</option>
            <option v-for="servidor in servidoresFiltrados" :value="servidor.serverId">{{servidor.serverId}}-{{ servidor.serverName }}</option>
        </select>
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import api from '../axios.js'

const props = defineProps({
    servidorCompra: String
})

const emit = defineEmits(['set-servidor'])

const gamesVersions = ref()
const versaoSelecionada = ref()
const servers = ref([])
async function reqGameVersions() {
    try {
        const response = await api.get('/game')
        gamesVersions.value = response.data
        // console.log(gamesVersions.value)
    } catch (error) {
        console.error('Erro ao buscar versões de jogos:', error)
    }
}

async function reqGameServers() {
    try {
        const response = await api.get('/server')
        servers.value = response.data
        // console.log(servers.value)
    } catch (error) {
        console.error('Erro ao buscar servers de jogos:', error)
    }
}


function handleGameVersionChange(event) {
    versaoSelecionada.value = event.target.value
    emit('set-servidor', event.target.value)
    // console.log('Versão de jogo selecionada:', versaoSelecionada.value, typeof versaoSelecionada.value)
}

const servidoresFiltrados = computed(() => {
    if (!versaoSelecionada.value) return []
    return servers.value.filter(server => server.game.gameId == versaoSelecionada.value)
})



onMounted(() => {
    reqGameVersions()
    reqGameServers()
})
// Lógica do componente pode ser adicionada aqui
</script>