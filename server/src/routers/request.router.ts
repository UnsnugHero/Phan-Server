import { Router } from 'express';

import RequestController from '../controllers/request.controller';
import { validatorMiddleware } from '../middleware/validators/index';

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
    this._router.post('/create', this._controller.createRequest);
    this._router.put('/:requestId', this._controller.updateRequest);
    this._router.delete('/:requestId', this._controller.deleteRequest);
  }
}

export = new RequestRouter().router;
