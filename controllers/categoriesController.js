const db = require('../db/queries');

//  function to display all categories
// async function getCategories(req, res) {
//   try {
//     const categories = await db.getAllCategories();
//     res.render('categories', {     
//       categories : categories 
//     });
//   } catch (error) {
//     console.error('Error fetching categories', error);
//     res.status(500).send('Server Error');
//   }
// }

// function to display category form
async function createCategoryGet(req, res) {
  try {
    res.render('categories_form');
  } catch (error) {
    console.error('Error fetching form', error);
    res.status(500).send('Server Error')
  }
}


// function to create a new category
async function createCategoryPost(req, res) {
  try {
    const categoryName = req.body.categoryName; // getting value of categoryName of form
    const imageFilename = req.file ? req.file.filename : 'default.jpg';  // Use default image if no file is uploaded
    await db.insertCategory(categoryName, imageFilename);
    res.redirect(302, '/');
  } catch (error) {
    console.error('Error adding new category', error);
    res.status(500).send('Server Error')
  }
}


// function to render update form using name and id
async function updateCategoryGet(req, res) {
  try {
    const categoryId = req.params.id          // extracting id from url
    const id = parseInt(categoryId, 10);      // string to integer

    const category = await db.selectCategory(id); // data of selected category

    res.render('categories_update_form', {
      category: category
    });
  
  } catch (error) {
    console.error('Error displaying update form', error);
    res.status(500).send('Server Error')
  }
}



// function to update a category
async function updateCategoryPost(req, res) {
  try {
    const categoryId = req.params.id;
    const id = parseInt(categoryId, 10);
    const categoryName = req.body.categoryName;
    
    const categoryImage = req.file ? req.file.filename : 'default.jpg';  // Only update image if a new one is uploaded


    if (categoryImage) {
      // If a new image is uploaded, update both name and image
      await db.updateCategoryWithImage(id, categoryName, categoryImage)
    } else {
      // If no new image is uploaded, update only the category name
      await db.updateCategory(categoryName, id)
    }
    

    res.redirect(302, '/');

  } catch (error) {
    console.error('Error updating category', error)
    res.status(500).send('Server Error')
  }
}



// function to delete a category
async function deleteCategoryPost(req, res) {
  try {
    const categoryId = req.params.id;
    const id = parseInt(categoryId, 10);

    await db.deleteCategory(id);
    res.redirect(302, '/')

  } catch (error) {
    console.error('Error deleting category', error);
    res.status(500).send('Server Error')
  }
  
}



// function to view items per category
async function ItemsByCategoriesGet(req, res) {
  try {
    const categoryId = parseInt(req.params.id, 10);   // extracting id of category from url and converting it from a string to integer.

    const items = await db.itemsByCategory(categoryId);   // calling the function to display all items by categoryid and passing in categoryid.

    // Check if category has any items
    if (items.length === 0) {
      return res.status(404).send('No items found for this category');
    }

    // Extract category name (it's the same for all items, so just use the first one)
    const categoryName = items[0].category_name;    //  This accesses the first element of the items array and accesses the category_name property of the object found at items[0]

    res.render('itemsPerCategory', {    //  object with two properties
      category: { name: categoryName }, // An object with a name property set to the value of categoryName. This allows you to pass category information to template.
      items                             //  A variable containing the list of items to be displayed.
    });
  } catch (error) {
    console.error('Error fetching items', error);
    res.status(500).send('Server Error');
  }
  
}




module.exports = {
  // getCategories,
  createCategoryGet,
  createCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
  ItemsByCategoriesGet
}