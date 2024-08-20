"use client";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { SolicitudesList } from "@/components/solicitudes-list";
import { Banner } from "@/components/banner";
import { SectionTittle } from "@/components/section-tittle";
import { CreateSolicitudForm } from "@/components/forms/create-solicitud-form";
import { SolicitudesProvider } from "@/contexts/SolicitudesContext";
const DashboardPage = () => {
  const { user, isLoading, logout } = useAuth();
  if (isLoading) return <p>Cargando...</p>;

  return (
    <SolicitudesProvider>
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
          <p>Acceso restringido.</p>
        )}
      </div>
    </SolicitudesProvider>
  );
};

export default DashboardPage;
