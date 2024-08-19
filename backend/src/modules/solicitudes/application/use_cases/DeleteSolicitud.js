class DeleteSolicitud {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    async execute(id) {
        await this.solicitudRepository.deleteSolicitud(id);
    }
}

module.exports = DeleteSolicitud;
