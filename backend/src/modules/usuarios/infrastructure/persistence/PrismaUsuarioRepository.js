const { PrismaClient, Prisma } = require('@prisma/client');
const Usuario = require('../../domain/entities/Usuario');
const IUsuarioRepository = require('../../domain/repositories/IUsuarioRepository');

class PrismaUsuarioRepository extends IUsuarioRepository {

    constructor(prismaClient) {
        super();
        this.prisma = prismaClient;
    }

    async findById(id) {
        try {
            const usuario = await this.prisma.usuario.findUniqueOrThrow({
                where: { id },
            });

            if (!usuario) return null;

            return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async findByCorreo(correo) {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: { correo },
            });

            if (!usuario) return null;

            return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async createUsuario(usuarioData) {
        try {
            const usuario = await this.prisma.usuario.create({
                data: usuarioData,
            });

            return new Usuario(usuario.id, usuario.correo, usuario.contrasena, usuario.rol);

        } catch (error) {
            throw new Error('Error al crear usuario');
        }
    }
}

module.exports = PrismaUsuarioRepository;
