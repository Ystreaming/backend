import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToDatabase } from './tools/database';
import { connectToRabbitMQ } from './tools/rabbitMQ';

dotenv.config({ path: './.env/.env.developpement' });

interface BasicRabbitMQConnection {
  close: () => Promise<void>;
}

let rabbitMQConnection: BasicRabbitMQConnection | null = null;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("Connexion à la base de données établie");

    const rabbitMQStuff = await connectToRabbitMQ();
    rabbitMQConnection = rabbitMQStuff.connection;
    console.log("Connexion à RabbitMQ établie");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage de l\'application :', error);
  }
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

async function gracefulShutdown(signal: AbortSignal) {
  console.log(`Reçu ${signal}. Fermeture du serveur...`);
  try {
    await mongoose.disconnect();
    console.log('Connexion à la base de données fermée.');

    if (rabbitMQConnection) {
      await rabbitMQConnection.close();
      console.log('Connexion à RabbitMQ fermée.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la fermeture des connexions:', error);
    process.exit(1);
  }
}

startServer();
