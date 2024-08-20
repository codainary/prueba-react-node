import { z } from "zod";

export const formSchema = z.object({
    correo: z.string().email({
      message: "¡Faltó tu correo!",
    }),
    contrasena: z.string().min(1, {
      message: "¡Tu contraseña es clave!",
    }),
  });

  export const createSolicitudSchema = z.object({
    codigo: z.string().min(1, "El código es requerido"),
    empleadoId: z.string().min(1, "El empleado es requerido"),
    resumen: z.string().min(1, "El enlace del resumen es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
  });