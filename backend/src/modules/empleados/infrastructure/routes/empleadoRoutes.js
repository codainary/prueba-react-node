import express from 'express'
import container from '../../../../shared/infrastructure/container.js'
import { authorizeRoles } from '../../../../shared/infrastructure/middlewares/authMiddleware.js'

const router = express.Router()

// Resolver el controlador desde el contenedor
const empleadoController = container.resolve('EmpleadoController')

// Rutas protegidas
router.post('/empleados', authorizeRoles('administrador'), (req, res, next) => {
    empleadoController.createEmpleado(req, res, next)
})

router.get(
    '/empleados',
    authorizeRoles('administrador', 'empleado'),
    (req, res, next) => {
        empleadoController.getAllEmpleados(req, res, next)
    }
)

export default router
