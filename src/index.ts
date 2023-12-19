import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToDatabase } from './tools/database';

dotenv.config({ path: './.env/.env.developpement' });

async function startServer() {
  try {
    await connectToDatabase();
    console.log("Connexion à la base de données établie");

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

export async function gracefulShutdown(signal: AbortSignal) {
  console.log(`Reçu ${signal}. Fermeture du serveur...`);
  try {
    await mongoose.disconnect();
    console.log('Connexion à la base de données fermée.');

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la fermeture des connexions:', error);
    process.exit(1);
  }
}

module.exports = {
  gracefulShutdown,
}

startServer();
