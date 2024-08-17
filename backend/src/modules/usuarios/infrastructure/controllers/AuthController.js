const RegisterUsuario = require('../../application/use_cases/RegisterUsuario');
const LoginUsuario = require('../../application/use_cases/LoginUsuario');
const PrismaUsuarioRepository = require('../persistence/PrismaUsuarioRepository');

const usuarioRepository = new PrismaUsuarioRepository();

class AuthController {
    async register(req, res, next) {
        const { correo, contrasena, rol } = req.body;
        const registerUsuario = new RegisterUsuario(usuarioRepository);
        
        try {
            const usuario = await registerUsuario.execute({ correo, contrasena, rol });
            res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        const { correo, contrasena } = req.body;
        const loginUsuario = new LoginUsuario(usuarioRepository);
        
        try {
            const { usuarioRecord, tokenizacion } = await loginUsuario.execute({ correo, contrasena });
            res.status(200).json({ user, token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
