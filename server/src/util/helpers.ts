import { Result, ValidationError } from 'express-validator';

export class CustomError extends Error {
  constructor(public statusCode: number, public message: string, public validationErrors?: Result<ValidationError>) {
    super();
  }
}
