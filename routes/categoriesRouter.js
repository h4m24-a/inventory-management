const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();


// router.get('/', categoriesController.getCategories);                      // displays all categories
router.get('/new', categoriesController.createCategoryGet);                  // display  new category form
router.post('/new', categoriesController.createCategoryPost);                // save submitted category data
router.get('/update/:id', categoriesController.updateCategoryGet);           // displays update form
router.post('/update/:id', categoriesController.updateCategoryPost);         // updates category
router.post('/delete/:id', categoriesController.deleteCategoryPost )         // deletes category

// router.get('/:id/items', categoriesController.getItemsByCategories)       // display items in a specific category




module.exports = router;
