class SolicitudController {
    constructor(
        createSolicitudUseCase,
        getSolicitudUseCase,
        getAllSolicitudesUseCase,
        deleteSolicitudUseCase
    ) {
        this.createSolicitudUseCase = createSolicitudUseCase
        this.getSolicitudUseCase = getSolicitudUseCase
        this.getAllSolicitudesUseCase = getAllSolicitudesUseCase
        this.deleteSolicitudUseCase = deleteSolicitudUseCase
    }

    async createSolicitud(req, res, next) {
        const { codigo, descripcion, resumen, empleadoId } = req.body

        try {
            const solicitud = await this.createSolicitudUseCase.execute({
                codigo,
                descripcion,
                resumen,
                empleadoId,
            })
            res.status(201).json(solicitud)
        } catch (error) {
            next(error)
        }
    }

    async getSolicitud(req, res, next) {
        const { id } = req.params

        try {
            const solicitud = await this.getSolicitudUseCase.execute(id)
            res.status(200).json(solicitud)
        } catch (error) {
            next(error)
        }
    }

    async getAllSolicitudes(req, res, next) {
        try {
            const solicitudes = await this.getAllSolicitudesUseCase.execute()
            res.status(200).json(solicitudes)
        } catch (error) {
            next(error)
        }
    }

    async deleteSolicitud(req, res, next) {
        const { id } = req.params

        try {
            await this.deleteSolicitudUseCase.execute(id)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}

export default SolicitudController
