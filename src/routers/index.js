import { Router } from 'express';

import AuthRouter from './auth.router.js';
import UserRouter from './user.router.js';
import CommentRouter from './comment.router.js';
import PollRouter from './poll.router.js';
import RequestRouter from './request.router.js';

const router = Router();

router.use('/test', (req, res) => {
  res.send('Oh baby a triple!!!');
});

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/requests', RequestRouter);
router.use('/poll', PollRouter);
router.use('/comments', CommentRouter);

export default router;
