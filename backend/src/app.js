const express = require('express');
const cors = require('cors'); 
const errorHandler = require('./modules/shared/infrastructure/middlewares/errorHandler')
const { authenticateJWT, unless } = require('./modules/shared/infrastructure/middlewares/authMiddleware')

const authRoutes = require('./modules/usuarios/infrastructure/routes/authRoutes')
const solicitudRoutes = require('./modules/solicitudes/infrastructure/routes/solicitudRoutes')
const empleadoRoutes = require('./modules/empleados/infrastructure/routes/empleadoRoutes')

const app = express()

// Configuración del middleware CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())

// Middleware de autenticación global (excluyendo rutas públicas)
app.use(unless(authenticateJWT, [
    { url: '/api/auth/login', methods: ['POST'] },
    { url: '/api/auth/register', methods: ['POST'] }
]))

// Rutas de la API.
app.use('/api/auth', authRoutes)
app.use('/api/', empleadoRoutes)
app.use('/api/', solicitudRoutes)

// Middleware de manejo de errores.
app.use(errorHandler)

module.exports = app
