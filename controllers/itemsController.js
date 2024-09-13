const db = require('../db/queries');

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


module.exports = {
  getItems
}