const Joi = require('joi');

// Middleware para validar la solicitud usando un esquema Joi
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
