import React, { createContext, useState, useContext } from 'react';

const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  return (
    <SolicitudesContext.Provider value={{ solicitudes, setSolicitudes }}>
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudesContext);
