const express = require('express');
const EmpleadoController = require('../controllers/EmpleadoController')

const empleadoController = new EmpleadoController();

const router = express.Router()

router.get('/', empleadoController.getAllEmpleados)
router.post('/', empleadoController.createEmpleado)

module.exports = router;