import { Order, OrderStore } from '../../src/models/order';
import { User, UserModel } from '../../src/models/user';
import { Product, ProductModel } from '../../src/models/product';

const orderStore = new OrderStore();
const userStore = new UserModel();
const productStore = new ProductModel();

let orderId: number;
let userId: number;
let productId: number;

describe('Order Model', () => {

  beforeAll(async () => {
    const user = await userStore.create({
      firstname: 'Order',
      lastname: 'Test',
      password: 'password123'
    } as User);
    userId = user.id as number;

    const product = await productStore.create({
      name: 'Order Product',
      price: 5
    } as Product);
    productId = product.id as number;
  });

  it('should create an order', async () => {
    const result = await orderStore.create({
      user_id: userId,
      status: 'active'
    } as Order);
    orderId = result.id as number;
    expect(result.status).toBe('active');
    expect(result.user_id).toBe(userId);
  });

  it('should return a list of orders', async () => {
    const result = await orderStore.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct order by id', async () => {
    const result = await orderStore.show(orderId);
    expect(result.id).toBe(orderId);
  });

  it('should add product to order', async () => {
    const result = await orderStore.addProduct({
      order_id: orderId,
      product_id: productId,
      quantity: 2
    });
    expect(result.quantity).toBe(2);
    expect(result.order_id).toBe(orderId);
  });

  it('should get current order by user', async () => {
    const result = await orderStore.currentOrderByUser(userId);
    expect(result.status).toBe('active');
    expect(result.user_id).toBe(userId);
  });

  it('should get completed orders by user', async () => {
    const result = await orderStore.completedOrdersByUser(userId);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should update an order', async () => {
    const result = await orderStore.update(orderId, 'complete');
    expect(result.status).toBe('complete');
  });

  it('should delete an order', async () => {
    const result = await orderStore.delete(orderId);
    expect(result.id).toBe(orderId);
  });
});