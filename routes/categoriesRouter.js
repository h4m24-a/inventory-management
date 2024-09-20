const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/categories');  // Save images in the categories folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// router.get('/', categoriesController.getCategories);                      // displays all categories
router.get('/new', categoriesController.createCategoryGet);                  // display  new category form
router.post('/new', upload.single('categoryImage'), categoriesController.createCategoryPost);           // save submitted category data

router.get('/update/:id', categoriesController.updateCategoryGet);           // displays update form
router.post('/update/:id', upload.single('categoryImage'), categoriesController.updateCategoryPost);    // updates category

router.post('/delete/:id', categoriesController.deleteCategoryPost )         // deletes category

router.get('/:id/items', categoriesController.ItemsByCategoriesGet);          // displays items by categories





module.exports = router;
