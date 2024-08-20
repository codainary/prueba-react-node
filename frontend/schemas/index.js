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
    codigo: z.number({
      message: "Solo se aceptan numeros",
    }).min(1, {
      message: "Este campo es requerido.",
    }).positive({ message: "Este campo es requerido." }),
    empleadoId: z.string().min(1, {
      message: "Este campo es requerido.",
    }),
    descripcion: z.string().min(25, { message: "Muy corta la descripción"}).max(30, {message: "Muy larga la descripción"}),
  });