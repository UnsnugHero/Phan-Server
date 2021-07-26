import { NextFunction, Request, Response } from 'express';

import { CustomError, GenericServerError } from '../util/helpers';

import { Request as PhanRequest } from '../util/database/models/Request';
import { IPhanRequest } from '../models/index';

class RequestController {
  /*************************************
   * Request CRUD
   *************************************/

  public async getRequest(req: Request, res: Response, next: NextFunction) {
    const requestId: string = req.params.requestId;

    try {
      const phanRequest = await PhanRequest.findById(requestId);

      if (!phanRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      return res.status(200).json(phanRequest);
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'Request not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async createRequest(req: Request, res: Response, next: NextFunction) {
    const { ...requestFields } = req.body;

    // construct request
    const userId = req.user?.id;
    const request: IPhanRequest = { ...requestFields, user: userId };

    // attempt creating new document
    try {
      const newRequest = await PhanRequest.create(request);
      return res.status(200).json(newRequest);
    } catch (error) {
      console.error(error);
      next(new GenericServerError(error));
    }
  }

  public async updateRequest(req: Request, res: Response, next: NextFunction) {
    const requestId: string = req.params.requestId;

    try {
      const newRequestData = { ...req.body, edited: true };
      const updatedRequest = await PhanRequest.findByIdAndUpdate(requestId, newRequestData);

      return res.status(200).json(updatedRequest);
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'Request not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async deleteRequest(req: Request, res: Response, next: NextFunction) {
    const requestId: string = req.params.requestId;

    try {
      await PhanRequest.findByIdAndDelete(requestId);
      return res.status(200).json({ message: 'Request successfully deleted' });
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'Request not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async searchRequests(req: Request, res: Response, next: NextFunction) {}

  /*************************************
   * Request Comments CRUD
   *************************************/
}

export = new RequestController();
