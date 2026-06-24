import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);
let token: string;
let productId: number;

describe('Product Endpoints', () => {

  beforeAll(async () => {
    const res = await request.post('/users').send({
      firstname: 'Product',
      lastname: 'Tester',
      password: 'password123'
    });
    token = res.body;
  });

  it('POST /products — should create a product', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Product', price: 10 });
    expect(res.status).toBe(200);
    productId = res.body.id;
    expect(res.body.name).toBe('Test Product');
  });

  it('GET /products — should return list of products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /products/:id — should return one product', async () => {
    const res = await request.get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it('PUT /products/:id — should update a product', async () => {
    const res = await request
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Product', price: 20 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Product');
  });

  it('DELETE /products/:id — should delete a product', async () => {
    const res = await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });
});