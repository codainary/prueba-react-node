class CreateEmpleado {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository
    }

    async execute(empleadoData) {
        return await this.empleadoRepository.createEmpleado(empleadoData)
    }
}

export default CreateEmpleado
