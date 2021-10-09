import { Result, ValidationError } from 'express-validator';
import { sign } from 'jsonwebtoken';

import { User } from 'models/user.model';

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user'
}

export const signJWT = (user: User) => {
  const jwtPayload = {
    role: user.role,
    userId: user.id,
    username: user.username
  };

  return sign(jwtPayload, process.env.SECRET_KEY as string, { expiresIn: '24d' });
};

export class CustomError extends Error {
  public statusCode: number;
  public message: string;
  public error?: Error;
  public validationErrors?: Result<ValidationError>;

  constructor(statusCode: number, message: string, error?: Error, validationErrors?: Result<ValidationError>) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.validationErrors = validationErrors;
  }
}

export class GenericServerError extends CustomError {
  constructor(error: Error) {
    super(500, 'Server Error', error);
  }
}
