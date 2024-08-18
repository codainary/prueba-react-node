class InsertarEmpleado {
    constructor(empleadoRepository) {
      this.empleadoRepository = empleadoRepository;
    }
  
    async execute(data) {
      // Validar datos si es necesario
      const nuevoEmpleado = await this.empleadoRepository.insertEmpleado(data);
      return nuevoEmpleado;
    }
  }
  
  module.exports = InsertarEmpleado;
  