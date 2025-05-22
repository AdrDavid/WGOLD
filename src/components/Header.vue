<template>
    <div class="w-full h-[70px] bg-[#202029] flex items-center px-4 shadow-lg">
        <div class="text-yellow-400 font-bold text-3xl">WoW Gold Market</div>
        <nav class="ml-auto">
            <ul class="flex text-xl space-x-6 text-white">
                <li class="hover:text-yellow-400 cursor-pointer"><router-link to="/cotacao"
                        class="hover:text-yellow-400 cursor-pointer">
                        Cotacao</router-link></li>
                <li class="hover:text-yellow-400 cursor-pointer"><router-link to="/vender"
                        class="hover:text-yellow-400 cursor-pointer">
                        Vender</router-link></li>
                <li class="hover:text-yellow-400 cursor-pointer"><router-link to="/home"
                        class="hover:text-yellow-400 cursor-pointer">
                        Contato</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script setup>

</script>

<style scoped></style>