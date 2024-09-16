const db = require('../db/queries');

// function to display all categories and their sneaker count
async function getCategories(req, res) {
  try {                                          // gets both details of categories and the number of sneakers in each category using join in sql.
    const categories = await db.getCategoriesAndSneakerCount();
    res.render('index', {     
      categories                      
    });
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).send('Server Error');
  }
}

/*
Within the loop in index.ejs, 
you can access properties like category.name and category.sneaker_count, which correspond to the columns returned by your SQL query.
*/




module.exports = {
  getCategories
}