import { Router } from 'express';

import UserRouter from './user.router';

class MainRouter {
  private _router = Router();
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
    this._router.use('/users', this._userRouter);
  }
}

export = new MainRouter().router;
