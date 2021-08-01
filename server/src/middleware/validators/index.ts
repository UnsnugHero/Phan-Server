import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { loginValidators } from './auth.validators';
import { createUserValidators, updateUserValidators } from './users.validators';
import {
  createRequestValidators,
  postCommentValidators,
  searchRequestValidators,
  updateCommentValidators,
  updateRequestValidators
} from './request.validators';

import { Validator } from '../../models/general.model';
import { CustomError } from '../../util/helpers';

/**
 * Validator Map used to identify which middleware validators will be applied to the current route.
 */
const validatorMap = (validatorType?: Validator) => {
  switch (validatorType) {
    // Auth Validation
    case Validator.LOGIN:
      return loginValidators;

    // Request Validation
    case Validator.CREATE_REQUEST:
      return createRequestValidators;
    case Validator.SEARCH_REQUEST:
      return searchRequestValidators;
    case Validator.UPDATE_REQUEST:
      return updateRequestValidators;

    case Validator.POST_COMMENT:
      return postCommentValidators;
    case Validator.UPDATE_COMMENT:
      return updateCommentValidators;

    // User Validation
    case Validator.CREATE_USER:
      return createUserValidators;
    case Validator.UPDATE_USER:
      return updateUserValidators;
    default:
      return [];
  }
};

export const validatorMiddleware = (validatorType?: Validator) => {
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
