class SolicitudService {
    constructor(solicitudRepository) {
        this.solicitudRepository = solicitudRepository
    }

    async getAllSolicitudes() {
        return await this.solicitudRepository.getAllSolicitudes()
    }
    
    async createSolicitud(solicitudData){
        return await this.solicitudRepository.createSolicitud(solicitudData)
    }

}

module.exports = SolicitudService;