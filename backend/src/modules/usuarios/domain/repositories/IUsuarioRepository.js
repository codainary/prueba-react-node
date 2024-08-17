// src/modules/usuarios/domain/repositories/IUsuarioRepository.js

class IUsuarioRepository {
    findById(id) {
        throw new Error('Método findById no implementado');
    }

    findByCorreo(correo) {
        throw new Error('Método findByEmail no implementado');
    }

    createUsuario(usuarioData) {
        throw new Error('Método create no implementado');
    }
}

module.exports = IUsuarioRepository;
