"use client"
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
const DashboardPage = () => {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) return <p>Cargando...</p>;

    return (
        <ProtectedRoute>
        <div>
          <h1>Perfil de Usuario</h1>
          <p>Nombre: {user?.correo}</p>
          <p>Email: {user?.rol}</p>
        </div>
        <Button variant="destructive" onClick={logout}>
            Salir
        </Button>
        </ProtectedRoute>
    );
}

export default DashboardPage
