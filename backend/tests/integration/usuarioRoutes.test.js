import request from 'supertest';
import app from '../../src/app';

describe('Usuario API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ correo: 'test@example.com', contrasena: 'password', rol: 'administrador' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Más pruebas para otras rutas
});
