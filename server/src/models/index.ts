// This file could potentially get large but this project won't get that big so it probably isn't an issue
import { Result, ValidationError } from 'express-validator';
import { ObjectId } from 'mongoose';

/*************************************
 * TYPES
 *************************************/

export type ValidatorType =
  // Auth Validations
  | 'login'

  // Request Validations
  | 'createRequest'
  | 'updateRequest'

  // User Validations
  | 'createUser'
  | 'updateUser';

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

// Requests
export interface RequestComment {}

export interface IPhanRequest {
  user: string | ObjectId;
  subject: string;
  description: string;
  location: string;
  likes: number;
  comments: RequestComment[];
  postedDate: Date;
  updatedDate: Date;
  edited: boolean;
  completed: boolean;
}
