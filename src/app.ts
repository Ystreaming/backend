import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const yamlFilePath = path.resolve(__dirname, '../documentation/openapi.yaml');
const swaggerDocument = YAML.load(yamlFilePath);
import cors from 'cors';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const UsersRoute = require('./routes/users.route');
const RolesRoute = require('./routes/roles.route');
const CategoryRoute = require('./routes/categories.route');
const VideosRoute = require('./routes/videos.route');
const ChannelsRoute = require('./routes/channels.route');
const CommentsRoute = require('./routes/comments.route');
const HistoricsRoute = require('./routes/historics.route');
const NotificationsRoute = require('./routes/notifications.route');

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/home/ubuntu/backend/uploads/files', express.static('/home/ubuntu/backend/uploads/files'));

app.use('/users', UsersRoute);
app.use('/roles', RolesRoute);
app.use('/category', CategoryRoute);
app.use('/videos', VideosRoute);
app.use('/channels', ChannelsRoute);
app.use('/comments', CommentsRoute);
app.use('/historics', HistoricsRoute);
app.use('/notifications', NotificationsRoute);

function sendNotificationViaSocket(notification: any) {
  io.emit('new-notification', notification);
}

app.get('/test/error', (req, res, next) => {
  const error = new Error('Test Error');
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({
    message: err.message,
  });
});

export { sendNotificationViaSocket }
export default server;