const db = require('../db/queries');

// function to display all items
async function getItems(req, res) {
  try {
    const items = await db.getAllItems()
    res.render('items', {
      items: items
    })
  } catch (error) {
    console.error('Error fetching items', error)
    throw error
  }
}


// function to render form to create item
async function createItemGet(req, res) {
  try {

    const nameOfCategories = await db.getNameOfCategories();    // gets name of all categories
                                                                // These names are passed to the EJS template as the categories variable.
    res.render('items_form', {     //  ejs template iterates over the categories list and dynamically generates the dropdown options for the form.
      categories: nameOfCategories                              // categories is an array of data that holds the name of the categories
    });
  } catch (error) {
    console.error('Error fetching items', error)
    throw error
  }
  
}


module.exports = {
  getItems,
  createItemGet
}