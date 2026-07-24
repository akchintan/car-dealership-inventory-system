describe('environment configuration', () => {
  const originalPort = process.env.PORT;
  const originalJwtSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    jest.resetModules();
    process.env.PORT = '5000';
    process.env.JWT_SECRET = 'test_secret';
  });

  afterAll(() => {
    if (originalPort === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = originalPort;
    }

    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  it('reads configuration values from environment variables', () => {
    const config = require('../../config/env').default;

    expect(config).toEqual({
      port: 5000,
      jwtSecret: 'test_secret'
    });
  });
});
