const express = require('express');
const container = require('../../../../shared/infrastructure/container');
const { authorizeRoles } = require('../../../../shared/infrastructure/middlewares/authMiddleware');
const { validateIdParam } = require('../../../../shared/infrastructure/middlewares/validateIdParam');

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

module.exports = router;
