// This file could potentially get large but this project won't get that big so it probably isn't an issue
import { Result, ValidationError } from 'express-validator';
import { CustomError } from 'util/helpers';

/*************************************
 * TYPES
 *************************************/

export type ValidatorType =
  // Auth Validations
  | 'login'

  // User Validations
  | 'createUser';

/*************************************
 * INTERFACES
 *************************************/

export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  error: CustomError;
  validationErrors?: Result<ValidationError>;
}
