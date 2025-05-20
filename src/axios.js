import axios from 'axios';

const url = "https://localhost:7199"

const api = axios.create({
    baseURL: url,
    timeout: 10000,
    headers:{
        contentType: 'application/json',
    }
})

// api.interceptors.request.use(config =>{
//     const token = localStorage.getItem('token')
//     if(token){
//         config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
// })

export default api