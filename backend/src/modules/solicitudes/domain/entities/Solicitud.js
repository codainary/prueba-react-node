class Solicitud {
    constructor(id, codigo, descripcion, resumen, empleadoId, empleado) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.resumen = resumen;
        this.empleadoId = empleadoId;
        this.empleado = empleado;
    }
}

export default Solicitud;