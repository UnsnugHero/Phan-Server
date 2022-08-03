import { validationResult } from 'express-validator';

import { loginValidators } from './auth.validators.js';
import { createUserValidators, updateUserValidators } from './users.validators.js';
import {
  createRequestValidators,
  postCommentValidators,
  searchRequestValidators,
  updateCommentValidators,
  updateRequestValidators
} from './request.validators.js';

import { CustomError } from '../../util/helpers.js';

/**
 * Validator Map used to identify which middleware validators will be applied to the current route.
 */
const validatorMap = (validatorType) => {
  switch (validatorType) {
    // Auth Validation
    case 'login':
      return loginValidators;

    // Request Validation
    case 'create_request':
      return createRequestValidators;
    case 'search_request':
      return searchRequestValidators;
    case 'update_request':
      return updateRequestValidators;

    case 'post_comment':
      return postCommentValidators;
    case 'update_comment':
      return updateCommentValidators;

    // User Validation
    case 'create_user':
      return createUserValidators;
    case 'update_user':
      return updateUserValidators;
    default:
      return [];
  }
};

export const validatorMiddleware = (validatorType) => {
  const validationErrorHandler = (req, _res, next) => {
    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError(400, 'Error validating request', undefined, errors);
    }

    next();
  };

  return [...validatorMap(validatorType), validationErrorHandler];
};
