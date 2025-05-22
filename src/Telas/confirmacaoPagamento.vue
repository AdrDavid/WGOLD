<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 class="text-3xl text-green-400 font-bold mb-4">Pagamento realizado com sucesso!</h1>

        <router-link :to="`/cotacao`">
            <button
                class="bg-[#0066CC] rounded-md cursor-pointer text-xl text-white rounded-md hover:bg-[#0054CC] transition-colors p-3">

                Voltar para o inicio</button>
        </router-link>

    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

</script>