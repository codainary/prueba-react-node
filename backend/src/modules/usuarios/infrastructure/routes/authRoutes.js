const express = require('express');
const container = require('../../../../shared/infrastructure/container');
const validateRequest = require('../../../../shared/infrastructure/middlewares/validateRequest');
const { registerUsuarioSchema } = require('../validators/usuarioValidator');
const { authorizeRoles } = require('../../../../shared/infrastructure/middlewares/authMiddleware');

const router = express.Router();

// Resolver controladores desde el contenedor
const authController = container.resolve('AuthController');

// Rutas públicas
router.post('/register', validateRequest(registerUsuarioSchema), authController.register.bind(authController));

router.post('/login', authController.login.bind(authController));

// Rutas protegidas
router.use(authorizeRoles('administrador', 'empleado'));
router.get('/perfil', (req, res) => {
    res.status(200).json({ usuario: req.user });
});

module.exports = router;
