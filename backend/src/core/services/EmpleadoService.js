class EmpleadoService {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository
    }

    async getAllEmpleados() {
        return await this.empleadoRepository.getAllEmpleados()
    }

    async createEmpleado(empleadoData){
        return await this.empleadoRepository.createEmpleado(employeeData)
    }
}

module.exports = EmpleadoService;