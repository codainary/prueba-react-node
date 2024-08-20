const CreateSolicitud = require('../CreateSolicitud');
const Solicitud = require('../../../domain/entities/Solicitud');

test('should create a new solicitud', async () => {
  const solicitudRepositoryMock = {
    createSolicitud: jest.fn().mockResolvedValue(new Solicitud(1, '1234', 'Desc', 'Resumen', 1)),
  };

  const createSolicitud = new CreateSolicitud(solicitudRepositoryMock);
  const result = await createSolicitud.execute({
    codigo: '1234',
    descripcion: 'Desc',
    resumen: 'Resumen',
    empleadoId: 1,
  });

  expect(result).toBeInstanceOf(Solicitud);
  expect(solicitudRepositoryMock.createSolicitud).toHaveBeenCalledTimes(1);
});
