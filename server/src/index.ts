import path from 'path';
import express from 'express';
import * as dotenv from 'dotenv';

import { connectDB } from './util/database';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
