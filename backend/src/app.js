const express = require('express');
const authRoutes = require('./modules/usuarios/infrastructure/routes/authRoutes')
const errorHandler = require('./modules/shared/infrastructure/middlewares/errorHandler')
const { authenticateJWT, unless } = require('./modules/shared/infrastructure/middlewares/authMiddleware')

// Importacion de rutas
const empleadoRoutes = require('./modules/empleados/infrastructure/routes/empleadoRoutes')

const app = express()

app.use(express.json())

// Middleware de autenticación global (excluyendo rutas públicas)
app.use(unless(authenticateJWT, [
    { url: '/api/auth/login', methods: ['POST'] },
    { url: '/api/auth/register', methods: ['POST'] }
]))

// Rutas de la API.
app.use('/api/auth', authRoutes)
app.use('/api/', empleadoRoutes)

// Middleware de manejo de errores.
app.use(errorHandler)

module.exports = app
