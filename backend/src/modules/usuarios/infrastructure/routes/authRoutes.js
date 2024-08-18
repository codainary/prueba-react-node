const express = require('express');

const authController = require('../controllers/AuthController')
const validateRequest = require('../../../shared/infrastructure/middlewares/validateRequest')
const { registerUsuarioSchema } = require('../validators/usuarioValidator')
const { authorizeRoles } =  require('../../../shared/infrastructure/middlewares/authMiddleware')

const router = express.Router();


// Rutas publicas
router.post('/register', validateRequest(registerUsuarioSchema), authController.register)
router.post('/login', authController.login);

// Rutas protegidas
router.get('/perfil', authorizeRoles('administrador', 'empleado'), (req, res) => {
    res.status(200).json({ usuario: req.user });
});

module.exports = router;
