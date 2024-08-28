// import prismaClient from './config/prismaClient.js';
import { prisma } from './config/prismaClient.js';


// Repositorios
import PrismaEmpleadoRepository from '../../modules/empleados/infrastructure/persistence/PrismaEmpleadoRepository.js';
import PrismaUsuarioRepository from '../../modules/usuarios/infrastructure/persistence/PrismaUsuarioRepository.js';
import PrismaSolicitudRepository from '../../modules/solicitudes/infrastructure/persistence/PrismaSolicitudRepository.js';

// Casos de Uso
import CreateEmpleado from '../../modules/empleados/application/use_cases/CreateEmpleado.js';
import GetAllEmpleados from '../../modules/empleados/application/use_cases/GetAllEmpleados.js';
import CreateSolicitud from '../../modules/solicitudes/application/use_cases/CreateSolicitud.js';
import GetSolicitud from '../../modules/solicitudes/application/use_cases/GetSolicitud.js';
import GetAllSolicitudes from '../../modules/solicitudes/application/use_cases/GetAllSolicitudes.js';
import DeleteSolicitud from '../../modules/solicitudes/application/use_cases/DeleteSolicitud.js';
import RegisterUsuario from '../../modules/usuarios/application/use_cases/RegisterUsuario.js';
import LoginUsuario from '../../modules/usuarios/application/use_cases/LoginUsuario.js';

// Controladores
import AuthController from '../../modules/usuarios/infrastructure/controllers/AuthController.js';
import EmpleadoController from '../../modules/empleados/infrastructure/controllers/EmpleadoController.js';
import SolicitudController from '../../modules/solicitudes/infrastructure/controllers/SolicitudController.js';
import logger from './config/loggerConfig.js';

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
const prismaEmpleadoRepository = new PrismaEmpleadoRepository(prisma);
const prismaUsuarioRepository = new PrismaUsuarioRepository(prisma);
const prismaSolicitudRepository = new PrismaSolicitudRepository(prisma);

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

export default container;
