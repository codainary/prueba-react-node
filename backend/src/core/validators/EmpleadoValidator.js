const Joi = require('joi');

// Esquema para la creación de empleados
const createEmpleadoSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  fechaIngreso: Joi.date().required(),
  salario: Joi.number().positive().required(),
});

module.exports = {
    createEmpleadoSchema
};