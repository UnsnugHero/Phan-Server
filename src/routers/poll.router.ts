import { Router } from 'express';

import { authToken } from '../middleware/index';
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
    this._router.get('/', this._controller.getCurrentPoll);
    this._router.post('/create', [authToken], this._controller.createNewPoll);
    this._router.put('/archive/:pollId', [authToken], this._controller.archivePoll);
  }
}

export = new PollRouter().router;
