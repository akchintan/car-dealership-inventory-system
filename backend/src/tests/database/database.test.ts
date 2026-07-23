import mongoose from 'mongoose';
import connectDatabase from '../../config/database';

jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connect: jest.fn()
  }
}));

describe('Database connection', () => {
  beforeEach(() => {
    delete process.env.MONGO_URI;
    jest.clearAllMocks();
  });

  it('throws an error when MONGO_URI is missing', async () => {
    await expect(connectDatabase()).rejects.toThrow(
      'MongoDB connection string is missing'
    );
    expect(mongoose.connect).not.toHaveBeenCalled();
  });
});
