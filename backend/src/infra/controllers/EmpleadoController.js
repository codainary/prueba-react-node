const EmpleadoService = require('../../core/services/EmpleadoService')
const EmpleadoRepositoy = require('../db/EmpleadoRepository')

const empleadoRepository = new EmpleadoRepositoy()
const empleadoService = new EmpleadoService(empleadoRepository)

class EmpleadoController {
    async getAllEmpleados(req, res) {
        const empleados = await empleadoService.getAllEmpleados()
        res.status(200).json(empleados)
    }

    async createEmpleado(req, res, next) {
        try {

            // Forzar un error intencional
            // throw new Error();

            const { nombre, fechaIngreso, salario } = req.body;
            const empleadoData = { nombre, fechaIngreso, salario };
    
            const empleado = await empleadoService.createEmpleado(empleadoData);
    
            res.status(201).json({
                message: 'Empleado creado exitosamente',
                data: empleado
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EmpleadoController