const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUsuario {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async execute({ contrasena, correo }) {
        const existingUsuario = await this.usuarioRepository.findByCorreo(correo)
        // console.log(existingUsuario);
        if (!existingUsuario) {
            throw new Error('Credenciales inválidas')
        }

        if (!contrasena || !existingUsuario.contrasena) {
            throw new Error('Contraseña no proporcionada o hash de contraseña no válido')
        }

        const isMatch = await bcrypt.compare(contrasena, existingUsuario.contrasena)

        if (!isMatch) {
            throw new Error('Credenciales inválidas')
        }
        
        const token  = jwt.sign({ id: existingUsuario.id, rol: existingUsuario.rol }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { token, existingUsuario };
    }
}

module.exports = LoginUsuario;
