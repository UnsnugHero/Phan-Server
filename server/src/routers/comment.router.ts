import { Router } from 'express';

import { authToken } from '../middleware';
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

  private _initializeRoutes() {
    this._router.post('/post', authToken, this._controller.postGeneralComment);
  }
}

export = new CommentRouter().router;
