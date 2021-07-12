import express from 'express';
import path from 'path';
import 'module-alias/register';

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// TODO: MODULE
import connectDB from '../src/util/database';

const PORT = process.env.PORT || 5000;

const app = express();

// connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
