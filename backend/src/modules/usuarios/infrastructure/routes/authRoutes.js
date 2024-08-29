import express from 'express'
import container from '../../../../shared/infrastructure/container.js'
import validateRequest from '../../../../shared/infrastructure/middlewares/validateRequest.js'
import { registerUsuarioSchema } from '../validators/usuarioValidator.js'
import { authorizeRoles } from '../../../../shared/infrastructure/middlewares/authMiddleware.js'

const router = express.Router()

// Resolver controladores desde el contenedor
const authController = container.resolve('AuthController')

// Rutas públicas
router.post(
    '/register',
    validateRequest(registerUsuarioSchema),
    authController.register.bind(authController)
)

router.post('/login', authController.login.bind(authController))

// Rutas protegidas
router.use(authorizeRoles('administrador', 'empleado'))
router.get('/perfil', (req, res) => {
    res.status(200).json({ usuario: req.user })
})

export default router
