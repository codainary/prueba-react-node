const express = require('express');

const authController = require('../controllers/AuthController')
const validateRequest = require('../../../shared/infrastructure/middlewares/validateRequest')
const { registerUsuarioSchema } = require('../validators/usuarioValidator')

const router = express.Router();

router.post('/register', validateRequest(registerUsuarioSchema), authController.register)
router.post('/login', authController.login);

module.exports = router;
