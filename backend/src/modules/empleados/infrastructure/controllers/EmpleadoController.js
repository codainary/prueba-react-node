class EmpleadoController {
    constructor(createEmpleadoUseCase, getAllEmpleadosUseCase) {
        this.createEmpleadoUseCase = createEmpleadoUseCase
        this.getAllEmpleadosUseCase = getAllEmpleadosUseCase
    }

    async createEmpleado(req, res, next) {
        const { fechaIngreso, nombre, salario } = req.body

        try {
            const empleado = await this.createEmpleadoUseCase.execute({
                fechaIngreso,
                nombre,
                salario,
            })
            res.status(201).json(empleado)
        } catch (error) {
            next(error)
        }
    }

    async getAllEmpleados(req, res, next) {
        try {
            const empleados = await this.getAllEmpleadosUseCase.execute()
            res.status(200).json(empleados)
        } catch (error) {
            next(error)
        }
    }
}

export default EmpleadoController
