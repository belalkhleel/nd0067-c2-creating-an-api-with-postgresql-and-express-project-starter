import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: 'active' | 'complete';
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {

  async create(o: Order): Promise<Order> {
    const conn = await client.connect();
    const sql = `INSERT INTO orders (user_id, status) 
                 VALUES ($1, $2) RETURNING *`;
    const result = await conn.query(sql, [o.user_id, o.status]);
    conn.release();
    return result.rows[0];
  }

  // إضافة product على order
  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    const conn = await client.connect();
    const sql = `INSERT INTO orders_products  (order_id, product_id, quantity) 
                 VALUES ($1, $2, $3) RETURNING *`;
    const result = await conn.query(sql, [op.order_id, op.product_id, op.quantity]);
    conn.release();
    console.log('Added product to order:', result.rows[0]);
    return result.rows[0];
  }

  // الـ Order الحالي للـ user
  async currentOrderByUser(userId: number): Promise<Order> {
try{    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE user_id=$1 AND status='active'`;
    const result = await conn.query(sql, [userId]);
    conn.release();
    console.log('Current order for user:', result.rows[0]);
    return result.rows[0];}
  catch (err) {
    console.error('Error fetching current order for user:', err);
    throw new Error(`Could not get current order for user ${userId}. Error: ${err}`);
  }};

  // الـ Orders المكتملة للـ user
  async completedOrdersByUser(userId: number): Promise<Order[]> {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE user_id=$1 AND status='complete'`;
    const result = await conn.query(sql, [userId]);
    conn.release();
    return result.rows;
  }
}