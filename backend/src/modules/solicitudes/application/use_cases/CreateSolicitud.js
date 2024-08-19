class CreateSolicitud {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    async execute(solicitudData) {
        return await this.solicitudRepository.createSolicitud(solicitudData);
    }
}

module.exports = CreateSolicitud;
