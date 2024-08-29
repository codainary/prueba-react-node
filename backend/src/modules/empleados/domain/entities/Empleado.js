class Empleado {
    constructor({ id, fechaIngreso, nombre, salario, solicitudes = [] }) {
        this.id = id
        this.fechaIngreso = fechaIngreso
        this.nombre = nombre
        this.salario = salario
        this.solicitudes = solicitudes
    }
}

export default Empleado
