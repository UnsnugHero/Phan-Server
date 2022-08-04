const mongoose = require('mongoose');
const check = require('express-validator').check;

const Request = mongoose.model('Request');

// Create Request Validators & Helpers

const checkDuplicateRequestSubject = async (subject) => {
  const request = await Request.findOne({ subject });
  if (request) return Promise.reject();
};

const createRequestValidators = [
  check(['subject', 'location'], 'Field cannot be empty').notEmpty(),
  check('subject', 'A Request with this subject already exists').custom((subject) =>
    checkDuplicateRequestSubject(subject)
  )
];

// Searh Request Validators
const searchRequestValidators = [check('subject', 'This field must exist').exists()];

// Update Request Validators & Helpers

// want to check that subject is not a duplicate only if the matching request found is not the one being updated
const checkDuplicateRequestSubjectUpdate = async (subject, req) => {
  const requestId = req.params.requestId;
  const request = await Request.findOne({ subject });
  if (request && requestId !== request.id) return Promise.reject();
};

const updateRequestValidators = [
  check(['subject', 'location'], 'Field cannot be empty').notEmpty(),
  check('subject', 'A Request with this subject already exists').custom((subject, { req }) =>
    checkDuplicateRequestSubjectUpdate(subject, req)
  )
];

// Post comment validators
const postCommentValidators = [check(['text'], 'Field is required').notEmpty()];
const updateCommentValidators = [check(['text'], 'Field is required').notEmpty()];

module.exports = {
  createRequestValidators,
  searchRequestValidators,
  updateRequestValidators,
  postCommentValidators,
  updateCommentValidators
};
