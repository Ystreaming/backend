import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Node.js en TypeScript !');
});
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
