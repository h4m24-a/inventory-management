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
    res.render('items_form');
  } catch (error) {
    console.error('Error fetching items', error)
    throw error
  }
  
}


module.exports = {
  getItems,
  createItemGet
}