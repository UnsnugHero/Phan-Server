const mongoose = require('mongoose');
const check = require('express-validator').check;

const User = mongoose.model('User');

// Create User Validators & Helpers

const checkDuplicateUsername = async (username) => {
  const user = await User.findOne({ username });
  if (user) return Promise.reject();
};

const createUserValidators = [
  check(['username', 'password'], 'Field is required').notEmpty(),
  check('username', 'Username should not be an email').not().isEmail(),
  check('username', 'This username is already in use').custom((username) => checkDuplicateUsername(username))
];

// Update user validators

// username and password should not be part of this request
const updateUserValidators = [check(['username', 'password'], 'Field should not be present').not().exists()];

module.exports = {
  createUserValidators,
  updateUserValidators
};
