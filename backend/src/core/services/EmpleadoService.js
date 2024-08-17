class EmpleadoService {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository
    }

    async getAllEmpleados() {
        return await this.empleadoRepository.getAllEmpleados()
    }

    async createEmpleado(empleadoData){
        return await this.empleadoRepository.createEmpleado(empleadoData)
    }
}

module.exports = EmpleadoService;