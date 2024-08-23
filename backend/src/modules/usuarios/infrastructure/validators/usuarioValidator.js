import Joi from 'joi';

export const registerUsuarioSchema = Joi.object({
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(6).required(),
    rol: Joi.string().valid('empleado', 'administrador')
});
