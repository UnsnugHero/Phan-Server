import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { Validator } from '../models/general.model';
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
    this._router.get('/', authToken, this._controller.getUser);
    this._router.post('/create', validatorMiddleware(Validator.CREATE_USER), this._controller.createNewUser);
    this._router.put(
      '/:userId',
      [authToken, ...validatorMiddleware(Validator.UPDATE_USER)],
      this._controller.updateUser
    );
    this._router.delete('/:userId', authToken, this._controller.deleteUser);
  }
}

export = new UserRouter().router;
