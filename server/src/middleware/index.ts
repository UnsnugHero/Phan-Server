import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../util/helpers';

export const errorHandler = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
};
