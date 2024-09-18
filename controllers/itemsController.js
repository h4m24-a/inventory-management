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


// function to display item form
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



// function to add a new item
async function createItemPost(req, res) {
  try {                                         // gets the data from form
    const itemName = req.body.itemName;         
    const itemPrice = req.body.itemPrice;
    const itemSize = req.body.itemSize;
    const category_id = req.body.itemCategory;

    if (!category_id) {
      throw new Error('Category ID is required.');
    }
    
    await db.insertItem(itemName, itemPrice, itemSize, category_id)      // invoke the db query and pass in the form data as aruements

    res.redirect(302, '/items')                                           // redirect to items page
    
  } catch (error) {
    console.error('Error adding item', error);
    throw error
  }
  
}


module.exports = {
  getItems,
  createItemGet,
  createItemPost
}