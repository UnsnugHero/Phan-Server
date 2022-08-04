const verify = require('jsonwebtoken').verify;

/**
 * Authorizes the request on the JWT that may or may not be attached to the request
 * @param req
 * @param res
 * @param next
 */
const authToken = (req, res, next) => {
  const authHeader = req.headers['x-auth-token'];
  if (!authHeader) {
    res.status(401).json({ message: 'No token, not authorized' });
  }

  try {
    const verified = verify(authHeader, process.env.SECRET_KEY);
    req.user = {
      role: verified.role,
      id: verified.userId,
      username: verified.username
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

/**
 * Authorizes the request based on if the user is an admin
 * @param req
 * @param res
 * @param next
 */
const authRole = (req, res, next) => {
  const role = req.user?.role;

  if (!role) {
    return res.status(401).json({ message: 'No user role, not authorized' });
  }

  if (role !== 'admin') {
    return res.status(401).json({ message: 'User not administration, not authorized' });
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
const errorHandler = (err, _req, res, _next) => {
  const errorResponse = {
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

module.exports = {
  authRole,
  authToken,
  errorHandler
};
