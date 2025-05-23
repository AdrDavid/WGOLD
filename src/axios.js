import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers:{
        contentType: 'application/json',
    }
})

api.interceptors.request.use(config =>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default api