const express = require('express');
const container = require('../../../../shared/infrastructure/container');
const { authorizeRoles } = require('../../../../shared/infrastructure/middlewares/authMiddleware');

const router = express.Router();

// Resolver el controlador desde el contenedor
const empleadoController = container.resolve('EmpleadoController');

// Rutas protegidas
router.post('/empleados', authorizeRoles('administrador'), (req, res, next) => {
    empleadoController.createEmpleado(req, res, next);
});

router.get('/empleados', authorizeRoles('administrador', 'empleado'), (req, res, next) => {
    empleadoController.getAllEmpleados(req, res, next);
});

module.exports = router;
