import PrismaUsuarioRepository from '../PrismaUsuarioRepository'
import Usuario from '../../../domain/entities/Usuario'
import prismaClient from '../../../../../shared/infrastructure/config/prismaClient'

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        usuario: {
            findUnique: jest.fn(),
            findUniqueOrThrow: jest.fn(),
            create: jest.fn(),
        },
    }
    return { PrismaClient: jest.fn(() => mPrismaClient) }
})

describe('PrismaUsuarioRepository', () => {
    let usuarioRepository

    beforeEach(() => {
        usuarioRepository = new PrismaUsuarioRepository(prismaClient)
    })

    it('should create a new user', async () => {
        const mockUserData = {
            correo: 'test@example.com',
            contrasena: 'password',
            rol: 'user',
        }
        const mockUser = { id: '1', ...mockUserData }
        prismaClient.usuario.create.mockResolvedValue(mockUser)

        const usuario = await usuarioRepository.createUsuario(mockUserData)

        expect(usuario).toBeInstanceOf(Usuario)
        expect(usuario.id).toBe('1')
        expect(prismaClient.usuario.create).toHaveBeenCalledWith({
            data: mockUserData,
        })
    })

    // Añade más pruebas aquí para `findById`, `findByCorreo`, etc.
})
