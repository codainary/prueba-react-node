const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const saltRounds = 10;

async function main() {
  // Verificar si el usuario administrador ya existe
  const existingAdmin = await prisma.usuario.findUnique({
    where: { correo: 'admin@admin.com' }
  });

  let adminUser;

  if (!existingAdmin) {
    // Encriptar la contraseña del usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    // Crear un usuario administrador
    adminUser = await prisma.usuario.create({
      data: {
        correo: 'admin@admin.com',
        contrasena: hashedPassword,
        rol: 'administrador'
      }
    });
  } else {
    console.log('Usuario administrador ya existe:', existingAdmin.correo);
    adminUser = existingAdmin;
  }

  // Crear empleados
  const empleados = await Promise.all([
    prisma.empleado.upsert({
      where: { id: 1 }, 
      update: {},
      create: {
        fechaIngreso: new Date(),
        nombre: 'Juan Caldero',
        salario: 50000
      }
    }),
    prisma.empleado.upsert({
      where: { id: 2 }, 
      update: {},
      create: {
        fechaIngreso: new Date(),
        nombre: 'Sonia Almanza',
        salario: 45000
      }
    }),
    prisma.empleado.upsert({
      where: { id: 3 }, 
      update: {},
      create: {
        fechaIngreso: new Date(),
        nombre: 'Daniela Rumañez',
        salario: 47000
      }
    })
  ]);

  // Crear solicitudes
  const solicitudes = await Promise.all([
    prisma.solicitud.upsert({
      where: { id: 1 },
      update: {},
      create: {
        codigo: 'SOL-001',
        descripcion: 'Descripción Solicitud 1',
        resumen: 'Resumen Solicitud 1',
        empleadoId: empleados[0].id
      }
    }),
    prisma.solicitud.upsert({
      where: { id: 2 },
      update: {},
      create: {
        codigo: 'SOL-002',
        descripcion: 'Descripción Solicitud 2',
        resumen: 'Resumen Solicitud 2',
        empleadoId: empleados[0].id
      }
    }),
    prisma.solicitud.upsert({
      where: { id: 3 },
      update: {},
      create: {
        codigo: 'SOL-003',
        descripcion: 'Descripción Solicitud 3',
        resumen: 'Resumen Solicitud 3',
        empleadoId: empleados[0].id
      }
    }),
    prisma.solicitud.upsert({
      where: { id: 4 },
      update: {},
      create: {
        codigo: 'SOL-004',
        descripcion: 'Descripción Solicitud 4',
        resumen: 'Resumen Solicitud 4',
        empleadoId: empleados[1].id
      }
    }),
    prisma.solicitud.upsert({
      where: { id: 5 }, // Asegúrate de que el ID sea único o maneja la lógica para asignar ID
      update: {},
      create: {
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
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
