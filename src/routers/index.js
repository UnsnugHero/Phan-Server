import { Router } from 'express';

import AuthRouter from './auth.router.js';
import UserRouter from './user.router.js';

const router = Router();

router.use('/test', (req, res) => {
  res.send('Oh baby a triple!!!');
});

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

export default router;
