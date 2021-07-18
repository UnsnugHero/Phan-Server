import { body } from 'express-validator';

import { User } from '../../models/User';

export const createUserValidators = [
  body(['username', 'password'], 'Field is required').not().isEmpty(),
  body('username', 'Username should not be an email').not().isEmail(),
  body('username').custom((username) => checkDuplicateUsername(username))
];

const checkDuplicateUsername = async (username: string) => {
  const user = await User.find({ username });
  if (user) return false;
};
