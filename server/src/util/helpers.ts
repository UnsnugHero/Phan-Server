import { Result, ValidationError } from 'express-validator';

export class GenericServerError extends Error {
  public statusCode: number = 500;
  public message: string = 'Server Error';

  constructor() {
    super();
  }
}

export class CustomError extends Error {
  constructor(public statusCode: number, public message: string, public validationErrors?: Result<ValidationError>) {
    super();
  }
}
