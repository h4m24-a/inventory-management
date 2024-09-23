const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validateCategory = require('../controllers/validation');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/categories');  // Save images in the categories folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  }
});

// File filter to validate file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/; // Allowed image types
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error('Error: Only images are allowed!'), false); // Reject the file
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});




// router.get('/', categoriesController.getCategories);                                                           // displays all categories
router.get('/new', categoriesController.createCategoryGet);                                                       // display  new category form
router.post('/new', validateCategory, upload.single('categoryImage'), categoriesController.createCategoryPost);   // save submitted category data

router.get('/update/:id', categoriesController.updateCategoryGet);                                                // displays update form
router.post('/update/:id', upload.single('categoryImage'), categoriesController.updateCategoryPost);              // updates category

router.post('/delete/:id', categoriesController.deleteCategoryPost )                                              // deletes category

router.get('/:id/items', categoriesController.ItemsByCategoriesGet);                                              // displays items by categories





module.exports = router;
