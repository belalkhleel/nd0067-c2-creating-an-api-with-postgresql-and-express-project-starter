import client from "../database";

export type User = {
  id: number;
  username: string;
  password: string;
};  

export class UserModel {
async create(user: User): Promise<User> {
  try {
    const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
    const result = await client.query(sql, [user.username, user.password]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not create user ${user.username}. Error: ${err}`);
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