const express = require('express');
const solicitudController = require('../controllers/SolicitudController');
const { authorizeRoles } =  require('../../../shared/infrastructure/middlewares/authMiddleware')
const { validateIdParam } =  require('../../../shared/infrastructure/middlewares/validateIdParam')

const router = express.Router();

router.post('/solicitudes', authorizeRoles('administrador'), solicitudController.createSolicitud);
router.get('/solicitudes/:id', validateIdParam, authorizeRoles('administrador'), solicitudController.getSolicitud);
router.get('/solicitudes', authorizeRoles('administrador'), solicitudController.getAllSolicitudes);
router.delete('/solicitudes/:id', validateIdParam, authorizeRoles('administrador'),  solicitudController.deleteSolicitud);

module.exports = router;
