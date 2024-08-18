const express = require('express')
const ampleadoController = require('../controllers/EmpleadoController')
const { authorizeRoles } =  require('../../../shared/infrastructure/middlewares/authMiddleware')

const router = express.Router();

// Rutas protegidas
router.post('/empleados', authorizeRoles('administrador', 'empleado'), ampleadoController.createEmpleado);
// router.get('/empleados/:id', EmpleadoController.getEmpleado);
// router.get('/empleados', EmpleadoController.getAllEmpleados);
// router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);

module.exports = router;
