import { Result, ValidationError } from 'express-validator';

export enum Validator {
  // auth
  LOGIN,

  // request
  CREATE_REQUEST,
  SEARCH_REQUEST,
  UPDATE_REQUEST,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,

  // user
  CREATE_USER,
  UPDATE_USER
}

/*************************************
 * TYPES
 *************************************/

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
