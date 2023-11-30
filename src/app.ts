import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const yamlFilePath = path.resolve(__dirname, '../documentation/openapi.yaml');
const swaggerDocument = YAML.load(yamlFilePath);
import cors from 'cors';

const app: Application = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

const UsersRoute = require('./routes/users.route');
const RolesRoute = require('./routes/roles.route');
const CategoryRoute = require('./routes/categories.route');
const VideosRoute = require('./routes/videos.route');
const ChannelsRoute = require('./routes/channels.route');
const CommentsRoute = require('./routes/comments.route');
const HistoricsRoute = require('./routes/historics.route');

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', UsersRoute);
app.use('/roles', RolesRoute);
app.use('/category', CategoryRoute);
app.use('/videos', VideosRoute);
app.use('/channels', ChannelsRoute);
app.use('/comments', CommentsRoute);
app.use('/historics', HistoricsRoute);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({
    message: err.message,
  });
});

io.on('connection', (socket) => {
  console.log('Client connecté');
});

export default app;
