import { Request, Response, Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { authToken } from '../middleware/index';
import { validatorMiddleware } from '../middleware/validators/index';

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
    this._router.get('/', authToken, (req: Request, res: Response) => {
      // @ts-ignore
      res.status(200).send(req.user);
    });
    this._router.post('/login', validatorMiddleware('login'), this._controller.login);
  }
}

export = new AuthRouter().router;
