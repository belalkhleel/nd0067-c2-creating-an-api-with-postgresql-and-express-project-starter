import { User, UserModel } from '../../src/models/user';

const store = new UserModel();
let userId: number;

describe('User Model', () => {

  it('should create a user', async () => {
    const result = await store.create({
      firstname: 'Test',
      lastname: 'User',
      password: 'password123'
    }as User);
    userId = result.id as number;
    expect(result.firstname).toBe('Test');
    expect(result.lastname).toBe('User');
  });

  it('should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the correct user by id', async () => {
    const result = await store.show(userId);
    expect(result.id).toBe(userId);
  });

});