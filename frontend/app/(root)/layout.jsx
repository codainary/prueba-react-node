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
        <Banner
          title={"¡Bievenido de vuelta!"}
        />
        <SectionTittle 
          title="Solictudes"
          subtitle="Gestiona las solicitudes de empleados."
        />
        <div className="flex">
          <section className="flex h-auto flex-1 flex-col p-6 max-md:pb-14 sm:px-14]">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default RootLayout;
