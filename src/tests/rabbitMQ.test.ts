import * as amqp from 'amqplib';
import { connectToRabbitMQ } from '../tools/rabbitMQ';

jest.mock('amqplib', () => ({
  connect: jest.fn(),
}));

describe('connectToRabbitMQ', () => {
  const mockConnect = amqp.connect as jest.Mock;
  const mockCreateChannel = jest.fn();
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockConnect.mockClear();
    mockCreateChannel.mockClear();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should connect to RabbitMQ and create a channel', async () => {
    const mockConnection = {
      createChannel: mockCreateChannel.mockResolvedValue('channel')
    };
    mockConnect.mockResolvedValue(mockConnection);

    const { connection, channel } = await connectToRabbitMQ();

    expect(mockConnect).toHaveBeenCalledWith(expect.any(String));
    expect(mockConnection.createChannel).toHaveBeenCalled();
    expect(channel).toEqual('channel');
  });

  it('should throw an error if connection to RabbitMQ fails', async () => {
    const error = new Error('Connection failed');
    mockConnect.mockRejectedValueOnce(error);

    await expect(connectToRabbitMQ()).rejects.toThrow('Connection failed');
  });

  it('should throw an error if creating a channel fails', async () => {
    const connectionError = new Error('Channel creation failed');
    const mockConnection = {
      createChannel: mockCreateChannel.mockRejectedValueOnce(connectionError)
    };
    mockConnect.mockResolvedValue(mockConnection);

    await expect(connectToRabbitMQ()).rejects.toThrow('Channel creation failed');
  });
});
