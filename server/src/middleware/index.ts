import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { ErrorResponse } from '../types';
import { CustomError } from '../util/helpers';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['x-auth-token'] as string;
  if (!authHeader) {
    throw new CustomError(401, 'No token, not authorized');
  }

  try {
    const verified = verify(authHeader, process.env.SECRET_KEY as string) as JwtPayload;
    req.user = verified.user;
    next();
  } catch (error) {
    throw new CustomError(401, 'Token invalid');
  }
};

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
    error: err.error
  };

  if (err.validationErrors) {
    errorResponse['validationErrors'] = err.validationErrors;
  }

  res.status(err.statusCode || 500).json(errorResponse);
};
