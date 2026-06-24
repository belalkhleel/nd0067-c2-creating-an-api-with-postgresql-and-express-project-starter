import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);
let token: string;
let userId: number;
let orderId: number;
let productId: number;

describe('Order Endpoints', () => {

  beforeAll(async () => {
    // Create a user and get token
    const userRes = await request.post('/users').send({
      firstname: 'Order',
      lastname: 'Tester',
      password: 'password123'
    });
    token = userRes.body;

    // Get userId
    const usersRes = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    userId = usersRes.body[0].id;

    // Create a product to use in order
    const productRes = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Order Product', price: 50 });
    productId = productRes.body.id;
  });

  it('POST /orders — should create an order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId, status: 'active' });
    expect(res.status).toBe(200);
    orderId = res.body.id;
    expect(res.body.status).toBe('active');
  });

  it('POST /orders/:id/addProducts — should add product to order', async () => {
    const res = await request
      .post(`/orders/${orderId}/addProducts`)
      .set('Authorization', `Bearer ${token}`)
      .send({ product_id: productId, quantity: 2 });
    expect(res.status).toBe(200);
    expect(res.body.order_id).toBe(orderId);
  });

  it('GET /orders/users/:userId — should return current order for user', async () => {
    const res = await request
      .get(`/orders/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user_id).toBe(userId);
  });

  it('PUT /orders/:id — should update order status', async () => {
    const res = await request
      .put(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'complete' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('complete');
  });

  it('DELETE /orders/:id — should delete an order', async () => {
    const res = await request
      .delete(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(orderId);
  });
});