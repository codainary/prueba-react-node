class Empleado {
    constructor(id, nombre, salario, fechaIngreso) {
        this.id = id
        this.nombre = nombre
        this.salario = salario
        this.fechaIngreso = new Date(fechaIngreso)
    }
}

module.exports = Empleado;