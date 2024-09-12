const db = require('../db/queries');

//  function to display all categories
// async function getCategories(req, res) {
//   try {
//     const categories = await db.getAllCategories();
//     console.log(categories)
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
    await db.insertCategories(categoryName);
    res.redirect('/')
  } catch (error) {
    console.error('Error adding new category', error);
    res.status(500).send('Server Error')
  }
}

module.exports = {
  createCategoryGet,
  createCategoryPost
}