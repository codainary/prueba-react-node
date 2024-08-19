"use client"

import { createContext, useState, useEffect, useContext } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authToken) {
      axios.get('/auth/perfil', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then(response => setUser(response.data))
        .catch(error => console.error("Error fetching user data", error))
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, [authToken]);

  console.log(user)
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
