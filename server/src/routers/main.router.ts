import { Router } from 'express';

import AuthRouter from './auth.router';
import RequestRouter from './request.router';
import UserRouter from './user.router';

class MainRouter {
  private _router = Router();
  private _authRouter = AuthRouter;
  private _requestRouter = RequestRouter;
  private _userRouter = UserRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._router = Router();
    this._initializeRoutes();
  }

  /**
   * Connect routes to routers
   */
  private _initializeRoutes() {
    this._router.use('/auth', this._authRouter);
    this._router.use('/requests', this._requestRouter);
    this._router.use('/users', this._userRouter);
  }
}

export = new MainRouter().router;
