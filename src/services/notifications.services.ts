import { connectToRabbitMQ } from '../tools/rabbitMQ';
import { EventEmitter } from 'events';
import express from 'express';

const queueName = 'notifications';

const eventEmitter: EventEmitter = new EventEmitter();

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

const app = express();

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const onNotification = (message: any) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  };

  eventEmitter.on('notification', onNotification);

  req.on('close', () => {
    eventEmitter.off('notification', onNotification);
  });
});

app.listen(3000, () => {
  console.log('Serveur à l\'écoute sur le port 3000');
});
