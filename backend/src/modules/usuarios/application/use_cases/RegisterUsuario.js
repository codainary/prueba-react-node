const bcrypt = require('bcrypt')

class RegisterUsuario {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async execute({ correo, contrasena, rol }) {
        const existingUsuario = await this.usuarioRepository.findByCorreo(correo)

        if(existingUsuario) {
            throw new Error('El usuario ya existe')
        }
        
        const hashedContrasena = await bcrypt.hash(contrasena, 10)

        const newUsuario = await this.usuarioRepository.createUsuario({ correo, contrasena: hashedContrasena, rol })
        
        return newUsuario;
    }
}

module.exports = RegisterUsuario;