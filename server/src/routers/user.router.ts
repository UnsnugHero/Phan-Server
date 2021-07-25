import { Router } from 'express';

import UserController from '../controllers/user.controller';
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
    this._router.post('/create', validatorMiddleware('createUser'), this._controller.createNewUser);
    this._router.put('/:userId', validatorMiddleware('updateUser'), this._controller.updateUser);
  }
}

export = new UserRouter().router;
