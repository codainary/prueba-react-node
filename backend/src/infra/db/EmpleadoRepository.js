const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class EmpleadoRepositoy {
    async getAllEmpleados() {
        return await prisma.empleado.findMany()
    }

    async createEmpleado(employeeData) {
        return await prisma.empleado.create({
            data: employeeData
        })
    }
}

module.exports = EmpleadoRepositoy;