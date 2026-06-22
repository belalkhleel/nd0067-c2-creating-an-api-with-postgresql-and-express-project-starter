import client from "../database";


export type Order = {
  id: number;
  user_id: number;
  status: string;
};  

export class OrderModel {
  async create(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await client.query(sql, [order.user_id, order.status]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order for user ${order.user_id}. Error: ${err}`);
    }
  }

async completeOrderByUserId(userId: number): Promise<Order> {
  try {
    const sql = 'UPDATE orders SET status = $1 WHERE user_id = $2 AND status = $3 RETURNING *';
    const result = await client.query(sql, ['complete', userId, 'active']);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not complete order for user ${userId}. Error: ${err}`);
  }}
}