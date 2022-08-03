import { Router } from 'express';

import { AuthController } from '../controllers/index.js';
import { validatorMiddleware } from '../middleware/validators/index.js';

const router = Router();

router.post('/login', validatorMiddleware('login'), AuthController.login);

export default router;
