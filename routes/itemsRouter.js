const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();


router.get('/', itemsController.getItems); // displays all categories
router.get('/new', itemsController.createItemGet) // display form to create new item
router.post('/new', itemsController.createItemPost)   //  Adds new submitted data 
router.get('/update/:id', itemsController.updateItemsGet)  // displays update form
router.post('/update/:id', itemsController.updateItemsPost) // Adds updated data
router.post('/delete/:id', itemsController.deleteItemsPost)// Delete an item

module.exports = router;