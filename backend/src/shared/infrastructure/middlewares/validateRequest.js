const Joi = require('joi');

/**
 * Middleware de validación de solicitudes basado en el esquema Joi proporcionado.
 * @param {Joi.ObjectSchema} schema - Esquema de Joi para validar el cuerpo de la solicitud.
 * @returns {Function} - Middleware para validar el cuerpo de la solicitud.
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map(detail => detail.message);
      return res.status(400).json({ errors: errorDetails });
    }

    next();
  };
};

module.exports = validateRequest;
