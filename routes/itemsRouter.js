const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();


router.get('/', itemsController.getItems); // displays all categories
router.get('/new', itemsController.createItemGet) // display form to create new item
// router.post('/new', itemsController.createItemPost)   //  saves new submitted data 

module.exports = router;