import { Result, ValidationError } from 'express-validator';

/*************************************
 * TYPES
 *************************************/

export type ValidatorType =
  // Auth Validations
  | 'login'

  // Request Validations
  | 'createRequest'
  | 'searchRequest'
  | 'updateRequest'

  // User Validations
  | 'createUser'
  | 'updateUser';

export type SortDir = 'asc' | 'desc';

/*************************************
 * INTERFACES
 *************************************/

// Error
export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  error?: Error;
  validationErrors?: Result<ValidationError>;
}
