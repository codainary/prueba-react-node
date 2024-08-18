const express = require('express');

const authController = require('../controllers/AuthController')
const validateRequest = require('../../../shared/infrastructure/middlewares/validateRequest')
const { registerUsuarioSchema } = require('../validators/usuarioValidator')
const passport = require('../../../shared/infrastructure/middlewares/passportJwtStrategy')

const router = express.Router();

router.post('/register', validateRequest(registerUsuarioSchema), authController.register)
router.post('/login', authController.login);

// Rutas protegidas
router.get('/perfil', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ usuario: req.user });
});

module.exports = router;
