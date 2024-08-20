// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const saltRounds = 10; // Número de rondas de sal

async function main() {
  // Encriptar la contraseña del usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', saltRounds);

  // Crear un usuario administrador
  const adminUser = await prisma.usuario.create({
    data: {
      correo: 'admin@admin.com',
      contrasena: hashedPassword,
      rol: 'administrador'
    }
  });

  // Crear empleados
  const empleados = await Promise.all([
    prisma.empleado.create({
      data: {
        fechaIngreso: new Date(),
        nombre: 'Juan Caldero',
        salario: 50000
      }
    }),
    prisma.empleado.create({
      data: {
        fechaIngreso: new Date(),
        nombre: 'Sonia Almanza',
        salario: 45000
      }
    }),
    prisma.empleado.create({
      data: {
        fechaIngreso: new Date(),
        nombre: 'Daniela Rumañez',
        salario: 47000
      }
    })
  ]);

  // Crear solicitudes
  const solicitudes = await Promise.all([
    prisma.solicitud.create({
      data: {
        codigo: 'SOL-001',
        descripcion: 'Descripción Solicitud 1',
        resumen: 'Resumen Solicitud 1',
        empleadoId: empleados[0].id
      }
    }),
    prisma.solicitud.create({
      data: {
        codigo: 'SOL-002',
        descripcion: 'Descripción Solicitud 2',
        resumen: 'Resumen Solicitud 2',
        empleadoId: empleados[0].id
      }
    }),
    prisma.solicitud.create({
      data: {
        codigo: 'SOL-003',
        descripcion: 'Descripción Solicitud 3',
        resumen: 'Resumen Solicitud 3',
        empleadoId: empleados[0].id 
      }
    }),
    prisma.solicitud.create({
      data: {
        codigo: 'SOL-004',
        descripcion: 'Descripción Solicitud 4',
        resumen: 'Resumen Solicitud 4',
        empleadoId: empleados[1].id 
      }
    }),
    prisma.solicitud.create({
      data: {
        codigo: 'SOL-005',
        descripcion: 'Descripción Solicitud 5',
        resumen: 'Resumen Solicitud 5',
        empleadoId: empleados[2].id 
      }
    })
  ]);

  console.log({ adminUser, empleados, solicitudes });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
