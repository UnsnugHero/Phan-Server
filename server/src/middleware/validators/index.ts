import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { loginValidators } from '../validators/auth.validators';
import { createUserValidators } from '../validators/users.validators';
import { ValidatorType } from '../../types/index';
import { CustomError } from '../../util/helpers';

/**
 * Validator Map used to identify which middleware validators will be applied to the current route.
 */
const validatorMap = (validatorType?: ValidatorType) => {
  switch (validatorType) {
    // Auth Validation
    case 'login':
      return loginValidators;
    // User Validation
    case 'createUser':
      return createUserValidators;
    default:
      return [];
  }
};

export const validatorMiddleware = (validatorType?: ValidatorType) => {
  const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError(400, 'Error validating request', errors);
    }

    next();
  };

  return [...validatorMap(validatorType), validationErrorHandler];
};
