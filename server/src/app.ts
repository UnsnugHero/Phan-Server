import path from 'path';
import express, { json } from 'express';
import * as dotenv from 'dotenv';

import { connectDB } from './util/database';
import MainRouter from './routers/main.router';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

class Server {
  public app = express();
  public router = MainRouter;

  constructor() {
    connectDB();
  }
}

// initialize server
const server = new Server();

// attach middlewares
server.app.use(json());

// append api/ before all routes
server.app.use('/api', server.router);

// listen on port
const port = process.env.PORT || 5000;
server.app.listen(port, () => console.log(`Listening on port ${port}`));
