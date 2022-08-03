import path from 'path';
import chalk from 'chalk';
import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';

import { connectDB } from './util/database/index.js';
// import { errorHandler } from './middleware/index.js';
import router from './routers/index.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// initialize server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// connect to database
connectDB();

// attach middlewares
app.use(json());

// websocket
io.on('connection', (socket) => {
  socket.on('postComment', (comment) => {
    io.emit('newComment', comment);
  });
});

// append api/ before all routes
app.use('/api', router);

// error handler middleware - this must be after routes
// app.use(errorHandler);

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(chalk.green(`Listening on port ${port}\n`)));
