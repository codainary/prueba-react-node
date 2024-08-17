const express = require('express');
const empleadoRoutes = require('./infra/routes/empleadoRoutes')
const errorHandler = require('./infra/middlewares/errorHandler');
const app = express();

app.use(express.json());

// Rutas de la aplicación
app.use('/api', empleadoRoutes);

// Middlewares
app.use(errorHandler);

module.exports = app;
