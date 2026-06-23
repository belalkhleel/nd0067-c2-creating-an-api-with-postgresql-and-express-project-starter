import client from "../database";   


export type Product = {
  id: number;
  name: string;
  price: number;
};


export class ProductModel {
  async create(product: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await client.query(sql, [product.name, product.price]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product ${product.name}. Error: ${err}`);
    }
  }

    async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {     
    throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

    async index(): Promise<Product[]> {
      try {
        const sql = 'SELECT * FROM products';
        const result = await client.query(sql);
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`);
      }}

}
