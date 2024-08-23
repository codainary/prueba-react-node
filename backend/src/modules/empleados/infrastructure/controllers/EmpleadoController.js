class EmpleadoController {
    constructor(createEmpleado, getAllEmpleados) {
        this.createEmpleado = createEmpleado;
        this.getAllEmpleados = getAllEmpleados;
    }

    async createEmpleado(req, res, next) {
        const { fechaIngreso, nombre, salario } = req.body;
        
        try {
            const empleado = await this.createEmpleado.execute({ fechaIngreso, nombre, salario });
            res.status(201).json(empleado);
        } catch (error) {
            next(error);
        }
    }

    async getAllEmpleados(req, res, next) {
        try {
            const empleados = await this.getAllEmpleados.execute();
            res.status(200).json(empleados);
        } catch (error) {
            next(error);
        }
    }
}

export default EmpleadoController;
