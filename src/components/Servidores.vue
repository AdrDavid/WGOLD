<template>
    <div class="containerServidores">
        <select name="" id="" class="selectFilter">
            <option value="">Espansão</option>
            <option value="">Classic SOD</option>
            <option value="">Cataclysm Classic</option>
            <option value="">Classic Hardcore</option>
            <option value="">The War Within</option>
            <option value="">Era Classica</option>
        </select>
        <select name="" id="" class="selectFilter">
            <option value="">Escolha o Servidor</option>
            <option value="">Server 1</option>
            <option value="">Server 2</option>
            <option value="">Server 3</option>
            <option value="">Server 4</option>
            <option value="">Server 5</option>
        </select>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .containerServidores{
        width: 100%;
        height: 40px;
        background-color: blueviolet;
        display: flex;
        padding: 0 10%;
        gap: 10px;
    }

    .selectFilter{
        border-radius: 3px;
        border: none;
        padding: 0 10px;
        font-size: 16px;
    }
</style>