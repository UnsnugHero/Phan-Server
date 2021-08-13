import { Router } from 'express';

import PollController from '../controllers/poll.controller';

class PollRouter {
  private _router = Router();
  private _controller = PollController;

  get router() {
    return this._router;
  }

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    // probably want a auth AND admin authenticator middleware here
    this._router.get('/', this._controller.getCurrentPoll);
  }
}

export = new PollRouter().router;
