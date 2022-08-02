import { check } from 'express-validator';

export const loginValidators = [
  check(['username', 'password'], 'Field is required').exists(),
  check(['username', 'password'], 'Field cannot be empty').notEmpty()
];
