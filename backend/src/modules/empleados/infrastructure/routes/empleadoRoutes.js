const express = require('express')
const ampleadoController = require('../controllers/EmpleadoController')
const { authorizeRoles } =  require('../../../shared/infrastructure/middlewares/authMiddleware')

const router = express.Router();

router.post('/empleados', authorizeRoles('administrador'), ampleadoController.createEmpleado)
router.get('/empleados', authorizeRoles('administrador', 'empleado'), ampleadoController.getAllEmpleados)

module.exports = router;
