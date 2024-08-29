class GetSolicitud {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository
    }

    async execute(id) {
        return await this.solicitudRepository.findSolicitudById(id)
    }
}

export default GetSolicitud
