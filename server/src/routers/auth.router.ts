import { Router } from 'express';
import { validatorMiddleware } from '../middleware/validators/index';

import AuthController from '../controllers/auth.controller';

class AuthRouter {
  private _router = Router();
  private _controller = AuthController;

  get router() {
    return this._router;
  }

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    this._router.post('/login', validatorMiddleware('login'), this._controller.login);
  }
}

export = new AuthRouter().router;
