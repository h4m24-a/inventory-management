const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();
const { validateItem } = require('../controllers/validation');

router.get('/', itemsController.getItems); // displays all categories
router.get('/new', itemsController.createItemGet) // display form to create new item
router.post('/new', validateItem, itemsController.createItemPost)   //  Adds new submitted data 
router.get('/update/:id', itemsController.updateItemsGet)  // displays update form
router.post('/update/:id', itemsController.updateItemsPost) // Adds updated data
router.post('/delete/:id', itemsController.deleteItemsPost) // Delete an item  on All Items page
router.post('/categories/:category_id/items/delete/:id', itemsController.deleteItemsInCategoryPost)  // Delete items in a category   

module.exports = router;