class GetAllEmpleados {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository
    }

    async execute() {
        return await this.empleadoRepository.findAllEmpleados()
    }
}

export default GetAllEmpleados
