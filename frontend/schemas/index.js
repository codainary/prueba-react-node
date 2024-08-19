import { z } from "zod";

export const formSchema = z.object({
    correo: z.string().email({
      message: "¡Faltó tu correo!",
    }),
    contrasena: z.string().min(1, {
      message: "¡Tu contraseña es clave!",
    }),
  });