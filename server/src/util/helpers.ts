import { Result, ValidationError } from 'express-validator';

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
