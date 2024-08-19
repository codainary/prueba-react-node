"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirige al login si no hay usuario
      router.push("/login"); 
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    // Espera a que el estado de carga se complete
    if (isLoading) return;
    
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
