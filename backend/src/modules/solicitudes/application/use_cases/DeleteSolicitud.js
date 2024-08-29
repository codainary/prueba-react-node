class DeleteSolicitud {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository
    }

    async execute(id) {
        await this.solicitudRepository.deleteSolicitud(id)
    }
}

export default DeleteSolicitud
