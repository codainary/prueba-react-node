const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class EmpleadoRepositoy {
    async getAllEmpleados() {
        return await prisma.empleado.findMany()
    }

    async createEmpleado(empleadoData) {
        return await prisma.empleado.create({
            data: empleadoData
        })
    }
}

module.exports = EmpleadoRepositoy;