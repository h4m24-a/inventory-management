const db = require('../db/queries');

// function to display all categories
async function getCategories(req, res) {
  try {
    const categories = await db.getAllCategories();
    console.log(categories)
    res.render('index', {     // res.render defaults status code to 200
      categories : categories 
    });
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  getCategories
}