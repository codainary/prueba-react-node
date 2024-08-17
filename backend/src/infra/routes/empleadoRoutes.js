const express = require('express');
const router = express.Router()
const EmpleadoController = require('../controllers/EmpleadoController');
const {createEmpleadoSchema} = require('../../core/validators/EmpleadoValidator')
const validateRequest = require('../middlewares/validateRequest');

const empleadoController = new EmpleadoController();


router.get('/empleado', empleadoController.getAllEmpleados)
router.post('/empleado', validateRequest(createEmpleadoSchema), empleadoController.createEmpleado)

module.exports = router;