<template>
    <div class="containerCotacao">
        <div class="lista">
            <table class="tabela">
                <thead>
                    <tr>
                        <th>Servidor</th>
                        <th>Quantidade</th>
                        <th>Valor por "K"</th>
                        <th>Vendedor</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Server 1</td>
                        <td>10.000</td>
                        <td>3.20</td>
                        <td>Vendedor</td>
                        <td class="tdBotao"><Button class="comprar">Comprar</Button></td>
                    </tr>
                    <tr>
                        <td>Server 2</td>
                        <td>11.000</td>
                        <td>2.75</td>
                        <td>Vendedor</td>
                        <td class="tdBotao"><router-link to="/comprar"><button class="comprar" @click="navigate">Comprar</button></router-link></td>
                    </tr>
                    <tr>
                        <td>Server 3</td>
                        <td>9.000</td>
                        <td>2.50</td>
                        <td>Vendedor</td>
                        <td class="tdBotao"><Button class="comprar">Comprar</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>  
        
    </div>
</template>

<script setup>

    

</script>

<style scoped>
    .containerCotacao{
        
        margin: 0 auto;
        padding: 50px 10%;
        min-height: 400px;
        /* background-color: cadetblue; */
    }

    .lista{
        width: 100%;
        /* background-color: aqua; */
    }

    .tabela{
        width: 100%;
        /* border-collapse: collapse; */
        text-align: left;
        font-size: 18px;

    }

    td{
        /* border: 1px solid #000; */
        border-bottom: 2px solid #000;
        padding-top: 10px;
    }

    .tdBotao{
        text-align: center;
        width: 100px;
        border: none;
    }

    .comprar{
        width: 100px;
        height: 30px;
        background-color: #5c5c5c;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }


    
</style>