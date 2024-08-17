const express = require('express');

const authRoutes = require('./modules/usuarios/infrastructure/routes/authRoutes')

const errorHandler = require('./modules/shared/infrastructure/middlewares/errorHandler')

const app = express();

app.use(express.json());

// Rutas de la aplicación
app.use('/api/auth', authRoutes);

// Middlewares
app.use(errorHandler);

module.exports = app;
