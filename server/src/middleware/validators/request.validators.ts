import { Request } from 'express';
import { check } from 'express-validator';

import { Request as PhanRequest } from '../../util/database/models/Request';

// Create Request Validators & Helpers

const checkDuplicateRequestSubject = async (subject: string) => {
  const request = await PhanRequest.findOne({ subject });
  if (request) return Promise.reject();
};

export const createRequestValidators = [
  check(['subject', 'description', 'location'], 'Field cannot be empty').notEmpty(),
  check('subject', 'A Request with this subject already exists').custom((subject) =>
    checkDuplicateRequestSubject(subject)
  )
];

// Searh Request Validators
export const searchRequestValidators = [check('subject', 'This field must exist').exists()];

// Update Request Validators & Helpers

// want to check that subject is not a duplicate only if the matching request found is not the one being updated
const checkDuplicateRequestSubjectUpdate = async (subject: string, req: Request) => {
  const requestId = req.params.requestId;
  const request = await PhanRequest.findOne({ subject });
  if (request && requestId !== request.id) return Promise.reject();
};

export const updateRequestValidators = [
  check(['subject', 'description', 'location'], 'Field cannot be empty').notEmpty(),
  check('subject', 'A Request with this subject already exists').custom((subject, { req }) =>
    checkDuplicateRequestSubjectUpdate(subject, req as Request)
  )
];

// Post comment validators

export const postCommentValidators = [check(['text'], 'Field is required').notEmpty()];
export const updateCommentValidators = [check(['text'], 'Field is required').notEmpty()];
