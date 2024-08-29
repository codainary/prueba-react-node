class GetAllSolicitudes {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository
    }

    async execute() {
        return await this.solicitudRepository.findAllSolicitudes()
    }
}

export default GetAllSolicitudes
