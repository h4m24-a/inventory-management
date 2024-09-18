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





// function to display update form
async function updateItemsGet(req, res) {
  try {
    const itemId = req.params.id;     // extracting id of item from url
    const id = parseInt(itemId, 10);  //  convert id from a string to integer

       // Ensure itemId is a number
       if (isNaN(itemId)) {
        console.error('Invalid item ID:', itemId);
        return res.status(400).send('Invalid item ID!');
      }

    const item = await db.selectItem(id)      // get data of the selected item using selectItem query and passing in the item id
    const nameOfCategories = await db.getNameOfCategories();  // Get data of categories

    res.render('items_update_form', {
      item: item,
      categories: nameOfCategories
    });
  } catch (error) {
    console.error('Error displaying update form', error);
    throw error
  }
}



// function to update item
async function updateItemsPost(req, res) {
  try {
    const itemId = req.params.id;
    const id = parseInt(itemId, 10);    // id of item

    // getting data from form
    const itemName = req.body.itemName;         
    const itemPrice = req.body.itemPrice;
    const itemSize = req.body.itemSize;
    const category_id = req.body.itemCategory;    // id of category

    await db.updateItem(itemName, itemPrice, itemSize, category_id, id);

    res.redirect(302, '/items');

  } catch (error) {
    console.error('Error updating form', error);
    throw error
  }
  
}



// function to delete a item
async function deleteItemsPost(req, res) {
  try {
    const itemId = req.params.id;

    const id = parseInt(itemId, 10);

    await db.deleteItem(id);

    res.redirect(302, '/items')
  } catch (error) {
    console.error('Error deleting item', error);
    throw error
  }
  
}


module.exports = {
  getItems,
  createItemGet,
  createItemPost,
  updateItemsGet,
  updateItemsPost,
  deleteItemsPost
}