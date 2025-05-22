<template>
    <Header />
    <div class="p-6">
        <div>
            <h1 class="text-3xl text-[white] text-yellow-400 mb-2">Então você quer vender Gold né?</h1>
            <p class="text-[white] text-[16px] mb-4">Bem então vamos começar, para isso vc precisa apenas ter algumas informações cadastradas</p>
        </div>
        <div class="p-6 py-12 bg-[#14141a] rounded-lg w-full min-h-[300px]">
            <div class="min-h-[100px] w-[300px] bg-gray-700 rounded-lg">
                <form action="">
                    <input type="text"  class="p-3 bg-gray-600 text-white rounded border border-gray-500">
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Header from '../components/Header.vue';

</script>