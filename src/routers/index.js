import express from 'express';

import MainRouter from './main.router.js';

const router = express.Router();

router.use('/test', MainRouter);

export default router;
