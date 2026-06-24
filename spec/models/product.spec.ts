import { Product, ProductModel } from '../../src/models/product';

const store = new ProductModel();
let productId: number;

describe('Product Model', () => {

  it('should create a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 10    } as Product);
    productId = result.id as number;
    expect(result.name).toBe('Test Product');
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct product by id', async () => {
    const result = await store.show(productId);
    expect(result.id).toBe(productId);
  });


});