const express = require('express');
const EmpleadoController = require('../controllers/EmpleadoController')

const empleadoController = new EmpleadoController();

const router = express.Router()

router.get('/empleado', empleadoController.getAllEmpleados)
router.post('/empleado', empleadoController.createEmpleado)

module.exports = router;