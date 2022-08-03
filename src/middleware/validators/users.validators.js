import { check } from 'express-validator';

import { User } from '../../util/database/models/index.js';

// Create User Validators & Helpers

const checkDuplicateUsername = async (username) => {
  const user = await User.findOne({ username });
  if (user) return Promise.reject();
};

export const createUserValidators = [
  check(['username', 'password'], 'Field is required').notEmpty(),
  check('username', 'Username should not be an email').not().isEmail(),
  check('username', 'This username is already in use').custom((username) => checkDuplicateUsername(username))
];

// Update user validators

// username and password should not be part of this request
export const updateUserValidators = [check(['username', 'password'], 'Field should not be present').not().exists()];
