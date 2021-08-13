import path from 'path';
import express, { json } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'dotenv';

import { connectDB } from './util/database/config';
import { errorHandler } from './middleware';
import MainRouter from './routers/main.router';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

class PhanServer {
  public app = express();
  public server = createServer(this.app);
  public io = new Server(this.server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  public router = MainRouter;

  constructor() {
    connectDB();
  }
}

// initialize server
const phanServer = new PhanServer();

// attach middlewares
phanServer.app.use(json());

// websocket
phanServer.io.on('connection', (socket: Socket) => {
  socket.on('postComment', (comment) => {
    phanServer.io.emit('newComment', comment);
  });
});

// append api/ before all routes
phanServer.app.use('/api', phanServer.router);

// error handler middleware - this must be after routes
phanServer.app.use(errorHandler);

// listen on port
const port = process.env.PORT || 5000;
phanServer.server.listen(port, () => console.log(`Listening on port ${port}`));
