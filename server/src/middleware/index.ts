import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../types';
import { CustomError } from '../util/helpers';

/**
 * @description Generic error handler that will intercept errors that occur on
 * routes. If an express validation error occurs, this will be added to the response.
 * @param err
 * @param _req
 * @param res
 * @param _next
 */
export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const errorResponse: ErrorResponse = {
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
    error: err
  };

  if (err.validationErrors) {
    errorResponse['validationErrors'] = err.validationErrors;
  }

  res.status(err.statusCode || 500).json(errorResponse);
};