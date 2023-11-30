// import { connectToRabbitMQ } from '../tools/rabbitMQ';

// const queueName = 'notifications';

// export async function sendNotification(message: any): Promise<void> {
//   try {
//     const { connection, channel } = await connectToRabbitMQ();

//     channel.assertQueue(queueName, { durable: false });
//     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
//     console.log(`Notification envoyée : ${JSON.stringify(message)}`);

//     setTimeout(() => {
//       connection.close();
//     }, 500);
//   } catch (error) {
//     console.error('Erreur lors de l\'envoi de la notification :', error);
//     throw error;
//   }
// }
