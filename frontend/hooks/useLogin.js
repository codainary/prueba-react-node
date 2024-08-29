'use client'

import { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()
    const login = async (correo, contrasena) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/auth/login', {
                correo,
                contrasena,
            })
            const token = response.data.token

            // Almacena el token en localStorage o en un contexto de autenticación
            localStorage.setItem('authToken', token)

            setSuccess('¡Inicio de sesión exitoso!')
            setError('')

            // Redirige al usuario al dashboard
            router.push('/dashboard')
        } catch (err) {
            if (err.response) {
                // El servidor respondió con un estado distinto de 2xx
                const { message, statusCode } = err.response.data

                switch (statusCode) {
                    case 500:
                        setError('Correo y/o contraseña incorrectos')
                        break
                    default:
                        setError(
                            'Error en el servidor. Intenta de nuevo más tarde.'
                        )
                        break
                }
            } else if (err.request) {
                // La solicitud fue hecha, pero no hubo respuesta
                setError('Error en la conexión. Por favor, revisa tu red.')
            } else {
                // Algo pasó al configurar la solicitud
                setError('Error al configurar la solicitud.')
            }

            setSuccess('')
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error, success }
}

export default useLogin
