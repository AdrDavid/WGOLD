import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => { // mode é 'development' ou 'production'
    // Carrega as variáveis do .env correspondentes ao modo (dev/prod)
    const env = loadEnv(mode, process.cwd(), 'VITE_'); 
    return{

        plugins: [
            vue(),
            tailwindcss(),
        ],
        server:{
            port: parseInt(env.VITE_PORT || '3000'),
            host: false
        }
    }
})
