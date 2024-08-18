const CreateEmpleado = require('../../application/use_cases/CreateEmpleado');
const GetAllEmpleados = require('../../application/use_cases/GetAllEmpleados');


const PrismaEmpleadoRepository = require('../persistence/PrismaEmpleadoRepository');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const empleadoRepository = new PrismaEmpleadoRepository(prisma);

class EmpleadoController {
    async createEmpleado(req, res, next) {
        const { fechaIngreso, nombre, salario } = req.body;
        
        const createEmpleado = new CreateEmpleado(empleadoRepository)
        
        try {
            const empleado = await createEmpleado.execute({ fechaIngreso, nombre, salario });
            res.status(201).json(empleado);
        } catch (error) {
            next(error);
        }
    }

    async getEmpleado(req, res, next) {
        const { id } = req.params;
        const getEmpleado = new GetEmpleado(empleadoRepository);
        try {
            const empleado = await getEmpleado.execute(id);
            res.status(200).json(empleado);
        } catch (error) {
            next(error);
        }
    }

    async getAllEmpleados(req, res, next) {
        const getAllEmpleados = new GetAllEmpleados(empleadoRepository)
        try {
            const empleados = await getAllEmpleados.execute()
            res.status(200).json(empleados)
        } catch (error) {
            next(error)
        }
    }

    async deleteEmpleado(req, res, next) {
        const { id } = req.params;
        const deleteEmpleado = new DeleteEmpleado(empleadoRepository);
        try {
            await deleteEmpleado.execute(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EmpleadoController();
