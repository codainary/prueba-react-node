const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUsuario {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async execute({ email, password }) {
        const usuarioRecord = await this.usuarioRepository.findByCorreo(correo)

        if(!usuarioRecord) {
            throw new Error('Credenciales incorrectas')
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if(!isMatch) {
            throw new Error('Credenciales incorrectas')
        }
        
        const tokenizacion = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { tokenizacion, usuarioRecord}
    }
}

module.exports = LoginUsuario;
