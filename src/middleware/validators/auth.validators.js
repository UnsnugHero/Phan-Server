const check = require('express-validator').check;

module.exports = [
  check(['username', 'password'], 'Field is required').exists(),
  check(['username', 'password'], 'Field cannot be empty').notEmpty()
];
