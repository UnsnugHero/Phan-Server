import { check } from 'express-validator';

import { User } from '../../models/User';

// Create User Validators & Helpers
const checkDuplicateUsername = async (username: string) => {
  const user = await User.findOne({ username });
  if (user) return Promise.reject();
};

export const createUserValidators = [
  check(['username', 'password'], 'Field is required').not().isEmpty(),
  check('username', 'Username should not be an email').not().isEmail(),
  check('username', 'This username is already in use').custom((username) => checkDuplicateUsername(username))
];
