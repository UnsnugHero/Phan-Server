import { Router } from 'express';

import { authToken } from '../middleware/index.js';
import { CommentController } from '../controllers/index.js';

const router = Router();

router.post('/post', authToken, CommentController.postGeneralComment);

export default router;
