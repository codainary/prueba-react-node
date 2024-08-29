import axios from 'axios'

// Crear una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})

// Añadir un interceptor para manejar errores globales (opcional)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Puedes manejar errores globales aquí
        return Promise.reject(error)
    }
)

export default axiosInstance
