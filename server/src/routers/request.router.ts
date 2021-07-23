import { Router } from 'express';
import { authToken } from '../middleware';

import RequestController from '../controllers/request.controller';

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
    // TODO determine which should be authenticated routes
    this._router.get('/:requestId', this._controller.getRequest);
    this._router.post('/create', authToken, this._controller.createRequest);
    this._router.post('/search', this._controller.searchRequests);
    this._router.put('/:requestId', authToken, this._controller.updateRequest);
    this._router.delete('/:requestId', authToken, this._controller.deleteRequest);
  }
}

export = new RequestRouter().router;
