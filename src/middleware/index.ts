import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { ErrorResponse } from '../models/general.model';
import { CustomError, ROLES } from '../util/helpers';

/**
 * Authorizes the request on the JWT that may or may not be attached to the request
 * @param req
 * @param res
 * @param next
 */
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['x-auth-token'] as string;
  if (!authHeader) {
    throw new CustomError(401, 'No token, not authorized');
  }

  try {
    const verified = verify(authHeader, process.env.SECRET_KEY as string) as JwtPayload;
    req.user = {
      role: verified.role,
      id: verified.userId,
      username: verified.username
    };

    next();
  } catch (error) {
    throw new CustomError(401, 'Token invalid');
  }
};

/**
 * Authorizes the request based on if the user is an admin
 * @param req
 * @param res
 * @param next
 */
export const authRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;

  if (!role) {
    throw new CustomError(401, 'No user role, not authorized');
  }

  if (role !== ROLES.ADMIN) {
    throw new CustomError(401, 'User not administration, not authorized');
  }

  next();
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
