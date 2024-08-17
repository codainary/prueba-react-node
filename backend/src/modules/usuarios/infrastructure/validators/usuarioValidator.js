const Joi = require('joi');

const registerUsuarioSchema = Joi.object({
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(6).required(),
    rol: Joi.string().valid('usuario', 'admin')
});

module.exports = {
    registerUsuarioSchema
};