class GetAllSolicitudes {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    async execute() {
        return await this.solicitudRepository.findAllSolicitudes();
    }
}

module.exports = GetAllSolicitudes;
