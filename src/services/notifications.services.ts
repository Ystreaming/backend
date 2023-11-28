import { connectToRabbitMQ } from '../tools/rabbitMQ';
import { EventEmitter } from 'events';

interface MyEventEmitter extends EventEmitter {
  emit(event: 'notification', message: any): boolean;
}

const queueName = 'notifications';

const eventEmitter: MyEventEmitter = new EventEmitter();

export async function sendNotification(message: any): Promise<void> {
  try {
    const { connection, channel } = await connectToRabbitMQ();

    channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`Notification envoyée : ${JSON.stringify(message)}`);

    eventEmitter.emit('notification', message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification :', error);
    throw error;
  }
}
eventEmitter.on('notification', (message) => {
  console.log('Notification émise :', message);
});
