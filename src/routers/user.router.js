import { Router } from 'express';

import { UserController } from '../controllers/index.js';
import { authToken } from '../middleware/index.js';
import { validatorMiddleware } from '../middleware/validators/index.js';

const router = Router();

router.get('/', authToken, UserController.getUser);
router.post('/create', validatorMiddleware('create_user'), UserController.createNewUser);
router.put('/:userId', [authToken, ...validatorMiddleware('update_user')], UserController.updateUser);
router.delete('/:userId', authToken, UserController.deleteUser);

export default router;
