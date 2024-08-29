import express from 'express';
import cors from 'cors';
import errorHandler from './shared/infrastructure/middlewares/errorHandler.js';
import { authenticateJWT, unless } from './shared/infrastructure/middlewares/authMiddleware.js';

import authRoutes from './modules/usuarios/infrastructure/routes/authRoutes.js';
import solicitudRoutes from './modules/solicitudes/infrastructure/routes/solicitudRoutes.js';
import empleadoRoutes from './modules/empleados/infrastructure/routes/empleadoRoutes.js';


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

export default app;
