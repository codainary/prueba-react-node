import express from 'express';
import container from '../../../../shared/infrastructure/container.js';
import { authorizeRoles } from '../../../../shared/infrastructure/middlewares/authMiddleware.js';
import { validateIdParam } from '../../../../shared/infrastructure/middlewares/validateIdParam.js';

const router = express.Router();

// Resolver el controlador desde el contenedor
const solicitudController = container.resolve('SolicitudController');

// Middleware de autorización aplicado globalmente para todas las rutas de solicitudes
router.use('/solicitudes', authorizeRoles('administrador'));

// Rutas para las solicitudes
router.post('/solicitudes', solicitudController.createSolicitud.bind(solicitudController));

router.get('/solicitudes/:id', validateIdParam, solicitudController.getSolicitud.bind(solicitudController));

router.get('/solicitudes', solicitudController.getAllSolicitudes.bind(solicitudController));

router.delete('/solicitudes/:id', validateIdParam, solicitudController.deleteSolicitud.bind(solicitudController));

export default router;
