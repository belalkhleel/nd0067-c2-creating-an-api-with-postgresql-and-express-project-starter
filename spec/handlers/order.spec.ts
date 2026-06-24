import { ProductModel } from '../../src/models/product';

const store = new ProductModel();

describe('Product Model', () => {
  
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await store.create({
        name: 'Test Product',
        price: 100,
        id: 0
    });
    expect(result.name).toBe('Test Product');
    expect(result.price).toBe(100);
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('should return the correct product', async () => {
    const result = await store.show(1);
    expect(result.id).toBe(1);
  });

});