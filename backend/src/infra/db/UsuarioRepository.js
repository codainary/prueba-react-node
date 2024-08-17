const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class UsuarioRepository {
    async findByCorreo(correo){
        const usuario = await prisma.usuario.findUniqueOrThrow({
            where: {
                correo,
            }
        })
        
        if(!usuario) return null
        
        return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol)
    }

    async createUsuario(usuarioData){
        return await prisma.usuario.create({
            data: usuarioData
        })
    }

    async findById(id){
        return await prisma.usuario.findUniqueOrThrow({
            where: {
                id,
            }
        })
    }
}

module.exports = UsuarioRepository;