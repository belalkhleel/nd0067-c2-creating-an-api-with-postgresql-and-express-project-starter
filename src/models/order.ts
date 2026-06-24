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
    try {
      const result = await client.query(
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *',
        [o.user_id, o.status]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const result = await client.query('SELECT * FROM orders');
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const result = await client.query('SELECT * FROM orders WHERE id=$1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async update(id: number, status: 'active' | 'complete'): Promise<Order> {
    try {
      const result = await client.query(
        'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
  try {
    await client.query('DELETE FROM orders_products WHERE order_id=$1', [id]);
    const result = await client.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not delete order ${id}. Error: ${err}`);
  }
}

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const result = await client.query(
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *',
        [op.order_id, op.product_id, op.quantity]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to order. Error: ${err}`);
    }
  }

  async currentOrderByUser(userId: number): Promise<Order> {
    try {
      const result = await client.query(
        "SELECT * FROM orders WHERE user_id=$1 AND status='active' LIMIT 1",
        [userId]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order for user ${userId}. Error: ${err}`);
    }
  }

  async completedOrdersByUser(userId: number): Promise<Order[]> {
    try {
      const result = await client.query(
        "SELECT * FROM orders WHERE user_id=$1 AND status='complete'",
        [userId]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders for user ${userId}. Error: ${err}`);
    }
  }
}