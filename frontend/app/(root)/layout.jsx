"use client";

import React from "react";
import ProtectedRoute from "@/components/protected-route";
import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { SectionTittle } from "@/components/section-tittle";

const RootLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <main className="relative">
        <Navbar />
        <Banner title={"¡Hola, Bienvenido de vuelta!"} />
        {/* <SectionTittle
          title="Solicitudes"
          subtitle="Gestiona las solicitudes de los empleados."
          btonTitle="Crear solicitud"
        /> */}
        <div className="flex">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default RootLayout;
