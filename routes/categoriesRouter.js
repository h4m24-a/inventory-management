const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();
const categoriesController = require('../controllers/categoriesController');
const { validateCategory } = require('../controllers/validation');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');  // Importing the S3 client
const { Upload } = require('@aws-sdk/lib-storage'); // For multipart uploads

// AWS Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,  
    acl: 'public-read',  //  make the file publicly readable
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // Generate a unique file name for the S3 object
      cb(null, `categories/${Date.now()}_${file.originalname}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);  // Accept the file
    } else {
      cb(new Error('Error: Only images are allowed!'), false);  // Reject the file
    }
  }
});

// router.get('/', categoriesController.getCategories);                                                           // displays all categories
router.get('/new', categoriesController.createCategoryGet);                                                       // display  new category form
router.post('/new', validateCategory, upload.single('categoryImage'), categoriesController.createCategoryPost);   // save submitted category data

router.get('/update/:id', categoriesController.updateCategoryGet);                                                // displays update form
router.post('/update/:id', upload.single('categoryImage'), categoriesController.updateCategoryPost);              // updates category

router.post('/delete/:id', categoriesController.deleteCategoryPost )                                              // deletes category

router.get('/:id/items', categoriesController.ItemsByCategoriesGet);                                              // displays items by categories

router.post('/:id/items/delete/:itemId', categoriesController.deleteItemsInCategoryPost)  // Delete items in a category  





module.exports = router;



// <img class="category-image" src="https://inventory-app-images.s3.eu-west-2.amazonaws.com/<%= category.image_filename %>" alt="<%= category.name %>">