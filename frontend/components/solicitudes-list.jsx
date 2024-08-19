// SolicitudCard.js
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Outfit({
  subsets: ["latin"],
  weight: ["600"],
});

export const SolicitudesList = () => {
  const { authToken } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  // Llamada a la API para obtener las solicitudes
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get("/solicitudes", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error fetching solicitudes:", error);
      }
    };
    fetchSolicitudes();
  }, [authToken]);

  // Manejar la eliminación de la solicitud
  const handleDelete = async () => {
    try {
      await axios.delete(`/solicitudes/${selectedSolicitud}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.filter(
          (solicitud) => solicitud.id !== selectedSolicitud
        )
      );
      // Cierra el diálogo después de eliminar
      setOpen(false); 
    } catch (error) {
      console.error("Error deleting solicitud:", error);
    }
  };

  // Abrir el AlertDialog y seleccionar la solicitud
  const openDialog = (solicitudId) => {
    setSelectedSolicitud(solicitudId);
    setOpen(true);
  };

  return (
    <div className="p-4 lg:px-[440px]">
      {solicitudes.map((solicitud) => (
        <div
          key={solicitud.id}
          className="bg-white border-solid border-[1px] border-gray-400 rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <div className="flex flex-col gap-3 m-3">
            <h2 className={cn("text-xl font-bold", font.className)}>{solicitud.codigo}</h2>
            <p className={cn("font-normal")}>{solicitud.descripcion}</p>
          </div>
          <Button
            variant="ghost"
            className={cn("text-md font-bold text-[#f76136]", font.className)}
            onClick={() => openDialog(solicitud.id)}
          >
            Eliminar
          </Button>
        </div>
      ))}

      {/* AlertDialog para confirmación de eliminación */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar esta solicitud? Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
