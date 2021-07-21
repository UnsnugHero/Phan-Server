import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { CustomError } from 'util/helpers';

import { Request as PhanRequest } from '../models/Request';

class RequestController {
  public async getRequest(req: Request, res: Response, next: NextFunction) {
    const requestId: ObjectId = req.body?.requestId;

    try {
      const phanRequest = await PhanRequest.findById(requestId);
      return res.status(200).json(phanRequest);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new CustomError(404, 'Request not found');
      }
      next(error);
    }
  }

  public async createRequest(req: Request, res: Response, next: NextFunction) {}

  public async updateRequest(req: Request, res: Response, next: NextFunction) {}

  public async deleteRequest(req: Request, res: Response, next: NextFunction) {}
}

export = new RequestController();
