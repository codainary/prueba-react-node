// const { PrismaClient } = require('@prisma/client');
const logger = require('../../../shared/infrastructure/config/loggerConfig');
const Empleado = require('../../domain/entities/Empleado');
const IEmpleadoRepository = require('../../domain/repositories/IEmpleadoRepository');

class PrismaEmpleadoRepository extends IEmpleadoRepository {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async createEmpleado(empleadoData) {
        try {

            logger.info('Datos recibidos para crear empleado', empleadoData);

            const empleado = await this.prisma.empleado.create({
                data: empleadoData,
                include: { solicitudes: true },
            });

            logger.info('Empleado creado en la base de datos', empleado);

            return new Empleado({...empleado,
                solicitudes: empleado.solicitudes || []
            });
        } catch (error) {
            logger.error('Error al crear empleado', { error: error.message });
            throw new Error('Error al crear empleado');
        }
    }

    async findEmpleadoById(id) {
        const empleado = await this.prisma.empleado.findUnique({
            where: { id },
            include: { solicitudes: true }
        });
        if (!empleado) return null;
        return new Empleado(empleado.id, empleado.fechaIngreso, empleado.nombre, empleado.salario, empleado.solicitudes);
    }

    async findAllEmpleados() {
        try {
            const empleados = await this.prisma.empleado.findMany({
                include: { solicitudes: true }
            });
    
            logger.info('Empleados consultados en la base de datos', empleados);
            
            return empleados.map(empleado => new Empleado({...empleado,
                solicitudes: empleado.solicitudes || []
            }));
            
        } catch (error) {
            logger.error('Error al obtener empleados', { error: error.message });
            throw new Error('Error al obtener empleados');
        }
    }

    async deleteEmpleado(id) {
        await this.prisma.empleado.delete({
            where: { id },
        });
    }
}

module.exports = PrismaEmpleadoRepository;
