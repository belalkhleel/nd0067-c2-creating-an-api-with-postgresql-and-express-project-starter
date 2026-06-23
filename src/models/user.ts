import client from "../database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const PEPPER = process.env.BCRYPT_PASSWORD as string;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string);
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};  

export class UserModel {
async create(user: User): Promise<User> {
        const hash = bcrypt.hashSync(user.password + PEPPER, SALT_ROUNDS);

  try {
    const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
    const result = await client.query(sql, [user.firstname, user.lastname, user.password]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not create user ${user.firstname} ${user.lastname}. Error: ${err}`);
  }}
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }}

    async index(): Promise<User[]> {
      try {
        const sql = 'SELECT * FROM users';
        const result = await client.query(sql);
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`);
      } }
}