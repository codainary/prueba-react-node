class GetEmpleado {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    async execute(id) {
        return await this.empleadoRepository.findEmpleadoById(id);
    }
}

module.exports = GetEmpleado;
