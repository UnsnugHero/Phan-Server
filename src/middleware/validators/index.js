const validationResult = require('express-validator').validationResult;

const loginValidators = require('./auth.validators');
const userValidators = require('./users.validators');
const requestValidators = require('./request.validators');

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
      return requestValidators.createRequestValidators;
    case 'search_request':
      return requestValidators.searchRequestValidators;
    case 'update_request':
      return requestValidators.updateRequestValidators;
    case 'post_comment':
      return requestValidators.postCommentValidators;
    case 'update_comment':
      return requestValidators.updateCommentValidators;

    // User Validation
    case 'create_user':
      return userValidators.createUserValidators;
    case 'update_user':
      return userValidators.updateUserValidators;
    default:
      return [];
  }
};

const validatorMiddleware = (validatorType) => {
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

module.exports = validatorMiddleware;
