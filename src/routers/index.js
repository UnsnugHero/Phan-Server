import { Router } from 'express';

import AuthRouter from './auth.router.js';

const router = Router();

router.use('/test', (req, res) => {
  res.send('Oh baby a triple!!!');
});

router.use('/auth', AuthRouter);

export default router;
