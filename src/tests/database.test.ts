import * as mongoose from 'mongoose';
import { connectToDatabase } from '../tools/database';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDatabase', () => {
  const mockConnect = mongoose.connect as jest.Mock;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });


  it('should connect to the database successfully', async () => {
    mockConnect.mockResolvedValueOnce('Connected');

    await expect(connectToDatabase()).resolves.toBeUndefined();

    expect(mockConnect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://'),
      expect.any(Object)
    );
  });

  it('should throw an error if the database connection fails', async () => {
    const error = new Error('Connection failed');
    mockConnect.mockRejectedValueOnce(error);

    await expect(connectToDatabase()).rejects.toThrow('Connection failed');

    expect(mockConnect).toHaveBeenCalled();
  });

  it('should pass correct mongo options to mongoose connect', async () => {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await connectToDatabase();

    expect(mockConnect).toHaveBeenCalledWith(expect.any(String), mongoOptions);
  });

  it('should use default mongo URI if none provided in env', async () => {
    delete process.env.MONGO_URI;

    await connectToDatabase();

    expect(mockConnect).toHaveBeenCalledWith('mongodb://localhost:27017/YStream', expect.any(Object));
  });

  it('should handle specific connection error', async () => {
    const specificError = new Error('Specific connection error');
    mockConnect.mockRejectedValueOnce(specificError);

    await expect(connectToDatabase()).rejects.toThrow('Specific connection error');
  });

  it('should handle mongoose connection warnings', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockWarningMessage = 'Mongoose warning';
    mockConnect.mockImplementationOnce(() => {
      console.warn(mockWarningMessage);
      return Promise.resolve('Connected with warnings');
    });

    await connectToDatabase();

    expect(consoleSpy).toHaveBeenCalledWith(mockWarningMessage);
    consoleSpy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    consoleSpy.mockRestore();
  });

  afterAll(async () => {
    jest.unmock('mongoose');
  });
});
