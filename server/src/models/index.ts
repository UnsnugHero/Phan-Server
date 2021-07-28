// This file could potentially get large but this project won't get that big so it probably isn't an issue
import { Result, ValidationError } from 'express-validator';
import { ObjectId, Document } from 'mongoose';

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

export type RequestSortOn = 'postedDate';

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

export interface RequestSearchQuery {
  subject?: string;
  sortOn?: RequestSortOn;
  sortDir?: SortDir;
  pageSize?: number;
  page?: number;
}

export interface IPhanRequest extends Document {
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
