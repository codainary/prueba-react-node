const logger = require('../../../shared/infrastructure/config/loggerConfig');
const Solicitud = require('../../domain/entities/Solicitud');
const ISolicitudRepository = require('../../domain/repositories/ISolicitudRepository');

class PrismaSolicitudRepository extends ISolicitudRepository {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }

    async createSolicitud(solicitudData) {
        try {
            logger.info('Datos recibidos para crear la solicitud', solicitudData)
            
            const solicitud = await this.prisma.solicitud.create({
                data: solicitudData,
                include: {
                    empleado: true,
                },
            });

            logger.info('Solicitud creada exitosamente', solicitud)
            
            return new Solicitud({...solicitud})
            
        } catch (error) {
            logger.error('Error al crear solicitud', { error: error.message });
            throw new Error('Error al crear solicitud');
        }
    }

    async findSolicitudById(id) {
        const solicitud = await this.prisma.solicitud.findUniqueOrThrow({
            where: { id },
            include: {
                empleado: true,
            },
        });
        if (!solicitud) return null;
        return new Solicitud(solicitud.id, solicitud.codigo, solicitud.descripcion, solicitud.resumen, solicitud.empleadoId);
    }

    async findAllSolicitudes() {
        const solicitudes = await this.prisma.solicitud.findMany()
        return solicitudes.map(solicitud => new Solicitud(...solicitudes))
    }

    async deleteSolicitud(id) {
        // await this.prisma.solicitud.delete({
        //     where: { id },
        // });
        try {

            // Verifica si la solicitud existe antes de eliminarla
            const solicitud = await this.findSolicitudById(id);

            logger.info('Solicitud encontrada', solicitud)
            
            if (!solicitud) {
                throw new Error('Solicitud no encontrado');
            }

            // Elimina la solicitud
            await this.prisma.solicitud.delete({
                where: { id: solicitud.id },
            });

            logger.info('Solicitud eliminada', solicitud)

        } catch (error) {
            logger.error('Error al eliminar solicitud', { error: error.message });
            throw new Error('Error al eliminar solicitud');
        }
    }
}

module.exports = PrismaSolicitudRepository;
