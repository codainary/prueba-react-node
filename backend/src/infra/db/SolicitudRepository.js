const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class SolicitudRepository {
    async getAllSolicitudes() {
        return await prisma.solicitud.findMany()
    }

    async createSolicitud(solicitudData) {
        return await prisma.solicitud.create({
            data: solicitudData
        })
    }
}