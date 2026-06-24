import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);
let token: string;
let userId: number;

describe('User Endpoints', () => {

  beforeAll(async () => {
    const res = await request.post('/users').send({
      firstname: 'Handler',
      lastname: 'Test',
      password: 'password123'
    });
    token = res.body;
  });

  it('POST /users — should create user and return token', async () => {
    const res = await request.post('/users').send({
      firstname: 'Test2',
      lastname: 'User2',
      password: 'password123'
    });
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('string');
  });

  it('POST /users/login — should return token on valid credentials', async () => {
    const res = await request.post('/users/login').send({
      firstname: 'Handler',
      lastname: 'Test',
      password: 'password123'
    });
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('string');
  });

  it('POST /users/login — should return 401 on invalid credentials', async () => {
    const res = await request.post('/users/login').send({
      firstname: 'Handler',
      lastname: 'Test',
      password: 'wrongpassword'
    });
    expect(res.status).toBe(401);
  });

  it('GET /users — should return list of users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    userId = res.body[0].id;
  });

  it('GET /users/:id — should return correct user', async () => {
    const res = await request
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it('PUT /users/:id — should update a user', async () => {
    const res = await request
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ firstname: 'Updated', lastname: 'User' });
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe('Updated');
  });

  it('DELETE /users/:id — should delete a user', async () => {
    const res = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });
});