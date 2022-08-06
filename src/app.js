const chalk = require('chalk');
const express = require('express');
const json = express.json;
const createServer = require('http').createServer;
const Server = require('socket.io').Server;

const connectDB = require('./util/database/config');
const errorHandler = require('./middleware/index').errorHandler;

const isProd = process.env.NODE_ENV === 'production';
const ioOrigin = isProd ? 'http://p5phansite.com' : 'http://localhost:3000';

if (!isProd) {
  require('dotenv').config();
}

// initialize server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ioOrigin,
    methods: ['GET', 'POST']
  }
});

// connect to database
connectDB();

// setup models
require('./util/database/models/Comment');
require('./util/database/models/Poll');
require('./util/database/models/Request');
require('./util/database/models/User');

// attach middlewares
app.use(json());

// websocket
io.on('connection', (socket) => {
  socket.on('postComment', (comment) => {
    io.emit('newComment', comment);
  });
});

// append api/ before all routes
app.use('/api', require('./routers/index'));

// error handler middleware - this must be after routes
app.use(errorHandler);

// start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(chalk.green(`Listening on port ${port}\n`)));
