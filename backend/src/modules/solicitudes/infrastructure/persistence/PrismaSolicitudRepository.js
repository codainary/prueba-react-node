import logger from '../../../../shared/infrastructure/config/loggerConfig.js'
import Solicitud from '../../domain/entities/Solicitud.js'
import ISolicitudRepository from '../../domain/repositories/ISolicitudRepository.js'

class PrismaSolicitudRepository extends ISolicitudRepository {
    constructor(prisma) {
        super()
        this.prisma = prisma
    }

    async createSolicitud(solicitudData) {
        try {
            logger.info(
                'Datos recibidos para crear la solicitud',
                solicitudData
            )

            const solicitud = await this.prisma.solicitud.create({
                data: solicitudData,
                include: {
                    empleado: true,
                },
            })

            logger.info('Solicitud creada exitosamente', solicitud)

            return new Solicitud({ ...solicitud })
        } catch (error) {
            logger.error('Error al crear solicitud', { error: error.message })
            throw new Error('Error al crear solicitud')
        }
    }

    async findSolicitudById(id) {
        try {
            const solicitud = await this.prisma.solicitud.findUniqueOrThrow({
                where: { id },
                include: {
                    empleado: true,
                },
            })

            logger.info('Solicitud encontrada', solicitud)

            if (!solicitud) return null

            return new Solicitud(
                solicitud.id,
                solicitud.codigo,
                solicitud.descripcion,
                solicitud.resumen,
                solicitud.empleadoId
            )
        } catch (error) {
            logger.error('Error al buscar solicitud por ID', {
                error: error.message,
            })
            throw new Error('Error al buscar solicitud por ID')
        }
    }

    async findAllSolicitudes() {
        try {
            const solicitudes = await this.prisma.solicitud.findMany({
                include: {
                    empleado: true,
                },
                orderBy: {
                    id: 'desc',
                },
            })

            logger.info('Solicitudes encontradas', solicitudes)

            return solicitudes.map(
                (solicitud) =>
                    new Solicitud(
                        solicitud.id,
                        solicitud.codigo,
                        solicitud.descripcion,
                        solicitud.resumen,
                        solicitud.empleadoId,
                        solicitud.empleado
                    )
            )
        } catch (error) {
            logger.error('Error al obtener todas las solicitudes', {
                error: error.message,
            })
            throw new Error('Error al obtener todas las solicitudes')
        }
    }

    async deleteSolicitud(id) {
        try {
            const solicitud = await this.findSolicitudById(id)

            logger.info('Solicitud encontrada para eliminar', solicitud)

            if (!solicitud) {
                throw new Error('Solicitud no encontrada')
            }

            await this.prisma.solicitud.delete({
                where: { id: solicitud.id },
            })

            logger.info('Solicitud eliminada', solicitud)
        } catch (error) {
            logger.error('Error al eliminar solicitud', {
                error: error.message,
            })
            throw new Error('Error al eliminar solicitud')
        }
    }
}

export default PrismaSolicitudRepository
