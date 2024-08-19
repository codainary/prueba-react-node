const CreateSolicitud = require('../../application/use_cases/CreateSolicitud');
const GetSolicitud = require('../../application/use_cases/GetSolicitud');
const GetAllSolicitudes = require('../../application/use_cases/GetAllSolicitudes');
const DeleteSolicitud = require('../../application/use_cases/DeleteSolicitud');
const PrismaSolicitudRepository = require('../persistence/PrismaSolicitudRepository');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const solicitudRepository = new PrismaSolicitudRepository(prisma);

class SolicitudController {
    async createSolicitud(req, res, next) {
        const { codigo, descripcion, resumen, empleadoId } = req.body;
        const createSolicitud = new CreateSolicitud(solicitudRepository);
        try {
            const solicitud = await createSolicitud.execute({ codigo, descripcion, resumen, empleadoId });
            res.status(201).json(solicitud);
        } catch (error) {
            next(error);
        }
    }

    async getSolicitud(req, res, next) {
        const { id } = req.params;
        const getSolicitud = new GetSolicitud(solicitudRepository);
        try {
            const solicitud = await getSolicitud.execute(id);
            res.status(200).json(solicitud);
        } catch (error) {
            next(error);
        }
    }

    async getAllSolicitudes(req, res, next) {
        const getAllSolicitudes = new GetAllSolicitudes(solicitudRepository);
        try {
            const solicitudes = await getAllSolicitudes.execute();
            res.status(200).json(solicitudes);
        } catch (error) {
            next(error);
        }
    }

    async deleteSolicitud(req, res, next) {
        const { id } = req.params;
        const deleteSolicitud = new DeleteSolicitud(solicitudRepository);
        try {
            await deleteSolicitud.execute(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SolicitudController();
