const expressValidator = require('express-validator');

module.exports = [
  expressValidator.check(['username', 'password'], 'Field is required').exists(),
  expressValidator.check(['username', 'password'], 'Field cannot be empty').notEmpty()
];
