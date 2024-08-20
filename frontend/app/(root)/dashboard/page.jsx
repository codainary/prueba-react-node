"use client";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { SolicitudesList } from "@/components/solicitudes-list";
import { Banner } from "@/components/banner";
import { SectionTittle } from "@/components/section-tittle";
import { CreateSolicitudForm } from "@/components/forms/create-solicitud-form";
const DashboardPage = () => {
  const { user, isLoading, logout } = useAuth();
  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      {user?.rol === "administrador" ? (
        <>
          <SectionTittle
            title="Solicitudes"
            subtitle="Gestiona las solicitudes de los empleados."
            btonTitle="Crear solicitud"
          >
            <CreateSolicitudForm />
          </SectionTittle>
          <SolicitudesList />
        </>
      ) : (
        <p>Soy empleado, no puedo ver las solicitudes aún.</p>
      )}
      {/* 
      <Button variant="destructive" onClick={logout}>
        Salir
      </Button> */}
    </div>
  );
};

export default DashboardPage;
