import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { createUserValidators } from '../validators/users.validators';
import { ValidatorType } from '../../types/index';

/**
 * Validator Map used to identify which middleware validators will be applied to the current route.
 */
const validatorMap = (validatorType?: ValidatorType) => {
  switch (validatorType) {
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
      return res.status(799).send(errors);
    }

    next();
  };

  return [...validatorMap(validatorType), validationErrorHandler];
};
