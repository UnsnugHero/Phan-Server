// This file could potentially get large but this project won't get that big so it probably isn't an issue
import { Result, ValidationError } from 'express-validator';

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

// Error
export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  validationErrors?: Result<ValidationError>;
}
