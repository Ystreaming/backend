import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from './tools/database';
import { connectToRabbitMQ } from './tools/rabbitMQ';

dotenv.config({ path: './.env/.env.developpement' });

async function startServer() {
  try {
    await connectToDatabase();
    console.log("Connexion à la base de données établie");

    const { connection: rabbitMQConnection, channel: rabbitMQChannel } = await connectToRabbitMQ();
    console.log("Connexion à RabbitMQ établie");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage de l\'application :', error);
  }
}

startServer();
