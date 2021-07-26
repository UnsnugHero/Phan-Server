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
    this._router.post('/search', validatorMiddleware('searchRequest'), this._controller.searchRequests);
    this._router.put(
      '/:requestId',
      [authToken, ...validatorMiddleware('updateRequest')],
      this._controller.updateRequest
    );
    this._router.delete('/:requestId', authToken, this._controller.deleteRequest);
  }
}

export = new RequestRouter().router;
