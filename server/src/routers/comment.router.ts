import { Router } from 'express';

import commentController from '../controllers/comment.controller';

class CommentRouter {
  private _router = Router();
  private _controller = commentController;

  get router() {
    return this._router;
  }

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {}
}

export = new CommentRouter().router;
