import { check } from 'express-validator';

import { Request } from '../../models/Request';

// Create Request Validators & Helpers

const checkDuplicateRequestSubject = async (subject: string) => {
  const request = await Request.findOne({ subject });
  if (request) return Promise.reject();
};

export const createRequestValidators = [
  check(['subject', 'description', 'location'], 'Field cannot be empty').notEmpty(),
  check('subject', 'A Request with this subject already exists').custom((subject) =>
    checkDuplicateRequestSubject(subject)
  )
];

// Update Request Validators

export const updateRequestValidators = [
  check(['subject', 'description', 'location'], 'Field cannot be empty').notEmpty()
];
