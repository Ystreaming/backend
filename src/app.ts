import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const yamlFilePath = path.resolve(__dirname, '../documentation/openapi.yaml');
const swaggerDocument = YAML.load(yamlFilePath);

const app: Application = express();

app.use(bodyParser.json());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});

module.exports = app;
