import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'KONECTA - Prueba Tecnica',
    description: 'Prueba para el puesto de Desarrollador React/Node',
    icons: [
        {
            url: 'assets/icons/frio.svg',
            href: 'assets/icons/frio.svg',
        },
    ],
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Envolver la aplicación con los proveedores de contexto */}
                <AuthProvider>
                    <UserProvider>{children}</UserProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
