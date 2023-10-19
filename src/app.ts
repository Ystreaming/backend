import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const yamlFilePath = path.resolve(__dirname, '../documentation/openapi.yaml');
const swaggerDocument = YAML.load(yamlFilePath);
const OpenApiValidator = require('express-openapi-validator');

const app: Application = express();

const UsersRoute = require('./routes/users.route');
const RolesRoute = require('./routes/roles.route');
const CategoriesRoute = require('./routes/categories.route');
const VideosRoute = require('./routes/videos.route');
const ChannelsRoute = require('./routes/channels.route');
const CommentsRoute = require('./routes/comments.route');
const HistoricsRoute = require('./routes/historics.route');


app.use(bodyParser.json());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
  }),
);

app.use('/users', UsersRoute);
app.use('/roles', RolesRoute);
app.use('/categories', CategoriesRoute);
app.use('/videos', VideosRoute);
app.use('/channels', ChannelsRoute);
app.use('/comments', CommentsRoute);
app.use('/historics', HistoricsRoute);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({
    message: err.message
  });
});

export default app;