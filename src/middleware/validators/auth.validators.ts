import { check } from 'express-validator';

export const loginValidators = [check(['username', 'password'], 'Field is required').exists()];
