import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env/.env.developpement' });

const rabbitMQHost = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`;

export async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitMQHost);
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.error('Erreur lors de la connexion à RabbitMQ :', error);
    throw error;
  }
}
