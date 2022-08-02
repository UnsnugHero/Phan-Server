import { Result, ValidationError } from 'express-validator';
import { sign } from 'jsonwebtoken';

export const signJWT = (user) => {
  const jwtPayload = {
    role: user.role,
    userId: user.id,
    username: user.username
  };

  return sign(jwtPayload, process.env.SECRET_KEY, { expiresIn: '24d' });
};

export class CustomError extends Error {
  statusCode;
  message;
  error;
  validationErrors;

  constructor(statusCode, message, error, validationErrors) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.validationErrors = validationErrors;
  }
}

export class GenericServerError extends CustomError {
  constructor(error) {
    super(500, 'Server Error', error);
  }
}
