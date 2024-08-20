const request = require('supertest');
const app = require('../../src/app');
const { faker } = require('@faker-js/faker');

let server;

const PORT = process.env.PORT || 5000;

beforeAll(() => {
    server = app.listen(PORT);
});

afterAll((done) => {
    server.close(done);
});


describe('Auth API Integration Tests', () => {
    let testUsuario;

    beforeAll(() => {
        testUsuario = {
            correo: 'mail@mail.com',
            contrasena: 'Test1234!',
            rol: 'empleado'
        };
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUsuario)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        testUsuario.id = response.body.id;
    });

    it('should fail to register a user with an existing email', async () => {
        await request(app)
            .post('/api/auth/register')
            .send(testUsuario)
            .expect(400);
    });

    it('should login the user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                correo: testUsuario.correo,
                contrasena: testUsuario.contrasena,
            })
            .expect(200);

        expect(response.body).toHaveProperty('token');
        testUsuario.token = response.body.token;
    });

    it('should fail login with wrong password', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                correo: testUsuario.correo,
                contrasena: 'WrongPassword123!',
            })
            .expect(401); 
    });

    it('should access protected route with valid token', async () => {
        const response = await request(app)
            .get('/api/auth/perfil')
            .set('Authorization', `Bearer ${testUsuario.token}`)
            .expect(200);

        expect(response.body).toHaveProperty('usuario');
        expect(response.body.usuario).toHaveProperty('correo', testUsuario.correo);
    });

    it('should fail to access protected route without token', async () => {
        await request(app)
            .get('/api/auth/perfil')
            .expect(401);
    });
});
