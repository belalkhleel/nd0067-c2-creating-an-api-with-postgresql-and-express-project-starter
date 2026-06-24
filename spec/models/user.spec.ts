import { User, UserModel } from '../../src/models/user';

const store = new UserModel();
let userId: number;

describe('User Model', () => {

  it('should create a user', async () => {
    const result = await store.create({
      firstname: 'Test',
      lastname: 'User',
      password: 'password123'
    } as User);
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

  it('should authenticate with correct password', async () => {
    const result = await store.authenticate('Test', 'User', 'password123');
    expect(result).not.toBeNull();
  });

  it('should fail authentication with wrong password', async () => {
    const result = await store.authenticate('Test', 'User', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('should update a user', async () => {
    const result = await store.update(userId, { firstname: 'Updated', lastname: 'Person' });
    expect(result.firstname).toBe('Updated');
    expect(result.lastname).toBe('Person');
  });

  it('should delete a user', async () => {
    const result = await store.delete(userId);
    expect(result.id).toBe(userId);
  });
});