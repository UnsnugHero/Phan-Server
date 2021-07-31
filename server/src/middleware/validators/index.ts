import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { loginValidators } from './auth.validators';
import { createUserValidators, updateUserValidators } from './users.validators';
import { createRequestValidators, searchRequestValidators, updateRequestValidators } from './request.validators';

import { ValidatorType } from '../../models/general';
import { CustomError } from '../../util/helpers';

/**
 * Validator Map used to identify which middleware validators will be applied to the current route.
 */
const validatorMap = (validatorType?: ValidatorType) => {
  switch (validatorType) {
    // Auth Validation
    case 'login':
      return loginValidators;

    // Request Validation
    case 'createRequest':
      return createRequestValidators;
    case 'searchRequest':
      return searchRequestValidators;
    case 'updateRequest':
      return updateRequestValidators;

    // User Validation
    case 'createUser':
      return createUserValidators;
    case 'updateUser':
      return updateUserValidators;
    default:
      return [];
  }
};

export const validatorMiddleware = (validatorType?: ValidatorType) => {
  const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError(400, 'Error validating request', undefined, errors);
    }

    next();
  };

  return [...validatorMap(validatorType), validationErrorHandler];
};
