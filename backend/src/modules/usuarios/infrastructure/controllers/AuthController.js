class AuthController {
    constructor(registerUsuario, loginUsuario) {
        this.registerUsuario = registerUsuario;
        this.loginUsuario = loginUsuario;
    }

    async register(req, res, next) {
        const { correo, contrasena, rol } = req.body;
        console.log('Request Body:', req.body); // Log de los datos recibidos
        try {
            const usuario = await this.registerUsuario.execute({ correo, contrasena, rol });
            res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        const { correo, contrasena } = req.body;

        try {
            const { token, existingUsuario } = await this.loginUsuario.execute({ contrasena, correo });
            res.status(200).json({ token, existingUsuario });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
