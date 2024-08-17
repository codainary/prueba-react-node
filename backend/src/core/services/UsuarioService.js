const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuarioService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async registerUsuario({ correo, contrasena, rol}){
        const existingUsuario = await this.usuarioRepository.findByCorreo(correo)

        if(existingUsuario) {
            throw new Error('El usuario ya existe')
        }
        
        const hashedContrasena = await bcrypt.hash(contrasena, 10)

        const newUsuario = await this.usuarioRepository.create({ correo, contrasena: hashedContrasena, rol })
        
        return newUsuario;
    }

    async loginUsuario({ correo, contrasena }) {
        const usuario = await this.usuarioRepository.findByCorreo(correo)

        if(!usuario) {
            throw new Error('Credenciales incorrectas')
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if(!isMatch) {
            throw new Error('Credenciales incorrectas')
        }
        
        const tokenizacion = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { tokenizacion, usuario}
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = new UsuarioService();
