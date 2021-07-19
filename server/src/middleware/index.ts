import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../types';
import { CustomError } from '../util/helpers';

export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const errorResponse: ErrorResponse = {
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  };

  if (err.validationErrors) {
    errorResponse['validationErrors'] = err.validationErrors;
  }

  res.status(err.statusCode || 500).json(errorResponse);
};
