import User from '../../models/user.model';

describe('User model', () => {
  it('exists and contains the required fields', () => {
    expect(User).toBeDefined();
    expect(User.schema.paths).toHaveProperty('name');
    expect(User.schema.paths).toHaveProperty('email');
    expect(User.schema.paths).toHaveProperty('password');
  });
});
