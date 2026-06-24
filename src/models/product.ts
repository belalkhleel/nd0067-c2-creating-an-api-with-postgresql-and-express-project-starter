import client from "../database";

export type Product = {
  id?: number;
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
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const result = await client.query('SELECT * FROM products');
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const result = await client.query('SELECT * FROM products WHERE id=$1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    try {
      const sql = `UPDATE products SET
        name  = COALESCE($1, name),
        price = COALESCE($2, price)
        WHERE id=$3 RETURNING *`;
      const result = await client.query(sql, [
        product.name ?? null,
        product.price ?? null,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const result = await client.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}