const app = require('./app');
const dotenv = require('dotenv');
import { connectToDatabase } from './database/database';

dotenv.config();

const port = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.log('Error with the server : ', err);
});
