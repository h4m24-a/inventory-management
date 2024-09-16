const db = require('../db/queries');

// function to display all categories
async function getCategories(req, res) {
  try {                                          // gets both details of categories and the number of sneakers in each category using join in sql.
    const categories = await db.getItemsAndSneakerCount();
    res.render('index', {     
      categories 
    });
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  getCategories
}