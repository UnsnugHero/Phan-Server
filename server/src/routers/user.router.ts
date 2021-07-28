import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { authToken } from '../middleware/index';
import { validatorMiddleware } from '../middleware/validators/index';

class UserRouter {
  private _router = Router();
  private _controller = UserController;

  get router() {
    return this._router;
  }

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    this._router.get('/:userId', authToken, this._controller.getUser);
    this._router.post('/create', validatorMiddleware('createUser'), this._controller.createNewUser);
    this._router.put('/:userId', [authToken, ...validatorMiddleware('updateUser')], this._controller.updateUser);
    this._router.delete('/:userId', authToken, this._controller.deleteUser);
    this._router.put('/like/:requestId', authToken, this._controller.likeRequest);
  }
}

export = new UserRouter().router;
