import { Router } from 'express';
import { authToken } from '../middleware';

import RequestController from '../controllers/request.controller';
import { validatorMiddleware } from '../middleware/validators';

class RequestRouter {
  private _router = Router();
  private _controller = RequestController;

  get router() {
    return this._router;
  }

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    this._router.get('/:requestId', this._controller.getRequest);
    this._router.post('/create', [authToken, ...validatorMiddleware('createRequest')], this._controller.createRequest);
    this._router.put(
      '/:requestId',
      [authToken, ...validatorMiddleware('updateRequest')],
      this._controller.updateRequest
    );
    this._router.delete('/:requestId', authToken, this._controller.deleteRequest);
    this._router.post('/search', validatorMiddleware('searchRequest'), this._controller.searchRequests);

    this._router.put('/like/:requestId', authToken, this._controller.likeRequest);
    this._router.put('/unlike/:requestId', authToken, this._controller.unlikeRequest);

    this._router.post('/comment/:requestId', authToken, this._controller.postComment);
    this._router.put('/comment/:requestId/:commentId', authToken, this._controller.updateComment);
    this._router.delete('/comment/:requestId/:commentId', authToken, this._controller.deleteComment);
  }
}

export = new RequestRouter().router;
