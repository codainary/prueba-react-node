const express = require('express');

const empleadoRoutes = require('./infra/routes/empleadoRoutes')
const authRoutes = require('./modules/usuarios/infrastructure/routes/authRoutes')

const errorHandler = require('./infra/middlewares/errorHandler')

const app = express();

app.use(express.json());

// Rutas de la aplicación
app.use('/api/auth', authRoutes);
app.use('/api', empleadoRoutes);

// Middlewares
app.use(errorHandler);

module.exports = app;
