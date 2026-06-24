import client from "../database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const PEPPER = process.env.BCRYPT_PASSWORD as string;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserModel {
  async create(user: User): Promise<User> {
    try {
      const hash = bcrypt.hashSync(user.password + PEPPER, SALT_ROUNDS);
      const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
      const result = await client.query(sql, [user.firstname, user.lastname, hash]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const result = await client.query('SELECT * FROM users');
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const result = await client.query('SELECT * FROM users WHERE id=$1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      const hash = user.password
        ? bcrypt.hashSync(user.password + PEPPER, SALT_ROUNDS)
        : undefined;
      const sql = `UPDATE users SET
        firstname = COALESCE($1, firstname),
        lastname  = COALESCE($2, lastname),
        password_digest = COALESCE($3, password_digest)
        WHERE id=$4 RETURNING *`;
      const result = await client.query(sql, [
        user.firstname ?? null,
        user.lastname ?? null,
        hash ?? null,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }

 async delete(id: number): Promise<User> {
  try {
    const orders = await client.query('SELECT id FROM orders WHERE user_id=$1', [id]);
    for (const order of orders.rows) {
      await client.query('DELETE FROM orders_products WHERE order_id=$1', [order.id]);
    }
    await client.query('DELETE FROM orders WHERE user_id=$1', [id]);
    const result = await client.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not delete user ${id}. Error: ${err}`);
  }
}

  async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE firstname=$1 AND lastname=$2',
      [firstname, lastname]
    );
    if (result.rows.length) {
      const user = result.rows[0];
      const match = bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest);
      if (match) return user;
    }
    return null;
  } catch (err) {
    throw new Error(`Could not authenticate user. Error: ${err}`);
  }
}
}