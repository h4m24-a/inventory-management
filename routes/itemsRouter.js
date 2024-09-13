const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();


router.get('/', itemsController.getItems); // displays all categories

module.exports = router;