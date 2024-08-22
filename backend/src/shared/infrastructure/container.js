const prismaClient = require('./config/prismaClient');

// Repositorios
const PrismaEmpleadoRepository = require('../../modules/empleados/infrastructure/persistence/PrismaEmpleadoRepository');
const PrismaUsuarioRepository = require('../../modules/usuarios/infrastructure/persistence/PrismaUsuarioRepository');
const PrismaSolicitudRepository = require('../../modules/solicitudes/infrastructure/persistence/PrismaSolicitudRepository');

// Casos de Uso
const CreateEmpleado = require('../../modules/empleados/application/use_cases/CreateEmpleado');
const GetAllEmpleados = require('../../modules/empleados/application/use_cases/GetAllEmpleados');
const CreateSolicitud = require('../../modules/solicitudes/application/use_cases/CreateSolicitud');
const GetSolicitud = require('../../modules/solicitudes/application/use_cases/GetSolicitud');
const GetAllSolicitudes = require('../../modules/solicitudes/application/use_cases/GetAllSolicitudes');
const DeleteSolicitud = require('../../modules/solicitudes/application/use_cases/DeleteSolicitud');
const RegisterUsuario = require('../../modules/usuarios/application/use_cases/RegisterUsuario');
const LoginUsuario = require('../../modules/usuarios/application/use_cases/LoginUsuario');

// Controladores
const AuthController = require('../../modules/usuarios/infrastructure/controllers/AuthController');
const EmpleadoController = require('../../modules/empleados/infrastructure/controllers/EmpleadoController');
const SolicitudController = require('../../modules/solicitudes/infrastructure/controllers/SolicitudController');
const logger = require('./config/loggerConfig');

// Configuración del contenedor
class Container {
    constructor() {
        this.dependencies = {};
    }

    register(name, dependency) {
        this.dependencies[name] = dependency;
    }

    resolve(name) {
        if (!this.dependencies[name]) {
            throw new Error(`${name} is not registered in the container`);
        }
        return this.dependencies[name];
    }
}

const container = new Container();

// Registro de repositorios
const prismaEmpleadoRepository = new PrismaEmpleadoRepository(prismaClient);
const prismaUsuarioRepository = new PrismaUsuarioRepository(prismaClient);
const prismaSolicitudRepository = new PrismaSolicitudRepository(prismaClient);

container.register('EmpleadoRepository', prismaEmpleadoRepository);
container.register('UsuarioRepository', prismaUsuarioRepository);
container.register('SolicitudRepository', prismaSolicitudRepository);

// Registro de casos de uso con sus dependencias
container.register('CreateEmpleado', new CreateEmpleado(prismaEmpleadoRepository));
container.register('GetAllEmpleados', new GetAllEmpleados(prismaEmpleadoRepository));
container.register('CreateSolicitud', new CreateSolicitud(prismaSolicitudRepository));
container.register('GetSolicitud', new GetSolicitud(prismaSolicitudRepository));
container.register('GetAllSolicitudes', new GetAllSolicitudes(prismaSolicitudRepository));
container.register('DeleteSolicitud', new DeleteSolicitud(prismaSolicitudRepository));
container.register('RegisterUsuario', new RegisterUsuario(prismaUsuarioRepository));
container.register('LoginUsuario', new LoginUsuario(prismaUsuarioRepository));

// Registro de controladores con sus dependencias inyectadas
container.register('EmpleadoController', new EmpleadoController(
    container.resolve('CreateEmpleado'),
    container.resolve('GetAllEmpleados')
));

container.register('SolicitudController', new SolicitudController(
    container.resolve('CreateSolicitud'),
    container.resolve('GetSolicitud'),
    container.resolve('GetAllSolicitudes'),
    container.resolve('DeleteSolicitud')
));

container.register('AuthController', new AuthController(
    container.resolve('RegisterUsuario'),
    container.resolve('LoginUsuario')
));

console.log(container)
module.exports = container;
