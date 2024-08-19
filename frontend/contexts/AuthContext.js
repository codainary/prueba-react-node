"use client"; // Marca este archivo como cliente

import { createContext, useState, useContext, useEffect } from "react";
import axios from "@/lib/axios"; // Ajusta la ruta según tu estructura de proyecto
import { useRouter } from 'next/navigation';

// Crea el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (correo, contrasena) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', { correo, contrasena });
      const { token, existingUsuario } = response.data;
     
      // Almacena el token en localStorage o en un contexto de autenticación
      localStorage.setItem('authToken', token);

      setAuthToken(token);
      setIsAuthenticated(true);
      setUser(existingUsuario);
    //   setSuccess("¡Inicio de sesión exitoso!");
      setError("");

      router.push('/dashboard');

    } catch (err) {
      setError("Correo y/o contraseña incorrectos.");
      setAuthToken("");
      setIsAuthenticated(false);
      setUser(null);
    //   setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken("");
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, isLoading, error, success, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
