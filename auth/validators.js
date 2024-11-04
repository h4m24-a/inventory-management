const { body } = require('express-validator');  // form validation

const validateUser = [
  // Validate and sanitize the username
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/) //  only alphanumeric characters and underscores
    .withMessage('Username must contain only letters, numbers, and underscores.')
    .escape(),

  // Validate password length
  body('password')
    .trim()
    .isLength({ min: 5, max: 128 })
    .withMessage('Password must be between 5 and 128 characters long.')
    .escape(),
];

module.exports = validateUser;