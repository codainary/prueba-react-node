class Solicitud {
    constructor(id, codigo, descripcion, resumen, empleadoId ) {
        this.id = id
        this.codigo = codigo
        this.descripcion = descripcion
        this.resumen = resumen
        this.empleadoId = empleadoId
    }
}

module.exports = Solicitud;
