const PrismaEmpleadoRepository = require('./PrismaEmpleadoRepository');
const prisma = require('../../../shared/infrastructure/config/prismaClient');

const empleadoRepository = new PrismaEmpleadoRepository(prisma);

module.exports = empleadoRepository;