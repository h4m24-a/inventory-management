const { body } = require('express-validator');  // form validation

const validateItem = [
  body('itemName')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Item name must be between 1 and 30 characters long.'),

  body('itemPrice')
    .trim()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number.'),

  body('itemSize')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Size must be between 1 and 10 characters long.'),

  
];


const validateCategory = [
  body('categoryName')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Item name must be between 1 and 30 characters long.'),

  
];

module.exports = validateItem, validateCategory