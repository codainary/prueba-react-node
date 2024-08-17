const { PrismaClient, Prisma } = require('@prisma/client');
const Usuario = require('../../domain/entities/Usuario');
const IUsuarioRepository = require('../../domain/repositories/IUsuarioRepository');

const prisma = new PrismaClient();

class PrismaUsuarioRepository extends IUsuarioRepository {
    async findById(id) {
        const usuario = await prisma.usuario.findUniqueOrThrow({
            where: {
                id,
            }
        })
        
         if (!usuario) return null;
         
         return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol);

    }

    async findByCorreo(correo){
        try {
            // Intenta encontrar al usuario por correo electrónico
            const usuario = await prisma.usuario.findUnique({
                where: {
                    correo: correo,
                },
            });
            
            // Si no se encuentra el usuario, retorna null
            if (!usuario) return null;
            
            // Crea y retorna una instancia del dominio Usuario con los datos obtenidos
            return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol);
            
        } catch (error) {
            // Maneja los errores específicos de Prisma
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                // Error de no encontrado, simplemente retorna null
                return null;
            }
            // Lanza otros errores que no están relacionados con Prisma
            throw error;
        }
    }

    async createUsuario(usuarioData) {
        const usuario = await prisma.usuario.create({
            data: usuarioData
        })
        
        return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol)
    }
}

module.exports = PrismaUsuarioRepository;
