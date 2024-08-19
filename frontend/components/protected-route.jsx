import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); // Redirige al login si no hay usuario
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (isLoading) return; // Espera a que el estado de carga se complete
    if (!isAuthenticated) {
      router.push("/login"); // Redirige al login si el usuario no está autenticado
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
