import logger from '../../../../shared/infrastructure/config/loggerConfig.js'
import Empleado from '../../domain/entities/Empleado.js'
import IEmpleadoRepository from '../../domain/repositories/IEmpleadoRepository.js'

class PrismaEmpleadoRepository extends IEmpleadoRepository {
    constructor(prisma) {
        super()
        this.prisma = prisma
    }

    async createEmpleado(empleadoData) {
        try {
            logger.info('Datos recibidos para crear empleado', empleadoData)

            const empleado = await this.prisma.empleado.create({
                data: empleadoData,
                include: { solicitudes: true },
            })

            logger.info('Empleado creado en la base de datos', empleado)

            return new Empleado({
                ...empleado,
                solicitudes: empleado.solicitudes || [],
            })
        } catch (error) {
            logger.error('Error al crear empleado', { error: error.message })
            throw new Error('Error al crear empleado')
        }
    }

    async findAllEmpleados() {
        try {
            const empleados = await this.prisma.empleado.findMany({
                include: { solicitudes: true },
            })

            logger.info('Empleados consultados en la base de datos', empleados)

            return empleados.map(
                (empleado) =>
                    new Empleado({
                        ...empleado,
                        solicitudes: empleado.solicitudes || [],
                    })
            )
        } catch (error) {
            logger.error('Error al obtener empleados', { error: error.message })
            throw new Error('Error al obtener empleados')
        }
    }
}

export default PrismaEmpleadoRepository
