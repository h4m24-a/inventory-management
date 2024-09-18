const pool = require("./pool");


//! Categories queries //

// Get all categories
async function getAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM categories");  // result of the pool.query() call is being destructured meaning that that the pool.query() method returns an object.
    return rows; // this object has a property called rows. By using destructuring, we directly extract the rows property into the rows variable.
  } catch (error) {
    console.error('An error occurred during query', error)
    throw error;
  }
};

/*
The result of the query is destructured to get the rows property, which contains the actual data returned by the query.
return rows end the functions and returns the values.
*/




// Get all categories and count number of sneakers
async function getCategoriesAndSneakerCount() {    // count number of sneakers in a category using COUNT in sql.  
  try {                                            // using left join to display all categories even if they don't have any items.
    const { rows } = await pool.query(`
                                      SELECT categories.id, categories.name, categories.image_filename, COUNT(items.id) AS sneaker_count
                                      FROM categories
                                      LEFT JOIN items
                                      ON categories.id = items.category_id
                                      GROUP BY categories.id
                                      ORDER BY categories.id ASC
                                    `);
    return rows
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
}




// Insert a new category
async function insertCategory(name) {
  try {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
  } catch (error) {
    console.error('An error occurred during query', error)
    throw error;
  }
}



// Get a specific category
async function selectCategory(id) {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('An error occurred during query', error)
    throw error
  }
}


// Update category
async function updateCategory(name, id) {
  try {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id]);
  } catch (error) {
    console.error('An error occurred during query', error)
    throw error
  }
}



// Delete category
async function deleteCategory(id) {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);       // deletes a record using the id of the selected category.
    
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error;
  }
  
}






//! Item queries //


// Get all items
async function getAllItems() {
  try {
    const { rows } = await pool.query(`
                                      SELECT items.id, items.name, items.price, items.size, categories.name AS category_name
                                      FROM items
                                      JOIN categories 
                                      ON items.category_id = categories.id
                                      `);

    return rows                                               
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
}



// Insert new item
async function insertItem(name, price, size, category_id) {
  try {
    await pool.query('INSERT into items (name, price, size, category_id) VALUES ($1, $2, $3, $4)', [name, price, size, category_id])
    
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
  
}






// Get a  specific Item
async function selectItem(id) {
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
    
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
}




// Update item
async function updateItem(name, price, size, category_id, id) {
  try {
    await pool.query('UPDATE items SET name = $1, price = $2, size = $3, category_id = $4 WHERE id = $5', [name, price, size, category_id, id])
    
  } catch (error) {
    console.error('An error occurred during the query');
    throw error;
  }
  
}



// Delete item from a category
async function deleteItem(id) {
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
  
}







// Get items of selected category
async function itemsByCategory(categoryId) {    // dynamically returning items of category using id extracted from url when selecting a category.
  try {
    const { rows } = await pool.query(`
                                        SELECT items.id, items.name, items.price, items.size, categories.name AS category_name
                                        FROM items
                                        JOIN categories ON items.category_id = categories.id
                                        WHERE categories.id = $1
                                      `, [categoryId]);

    return rows;
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error;
  }
}







//! Extra queries //

// Search for item




// Sorting items



// Filtering items



// Get name of catagories for dropdown.
async function getNameOfCategories() {
  try {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows
  } catch (error) {
    console.error('An error occurred during the query', error);
    throw error
  }
}

module.exports = {
  getAllCategories,
  insertCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
  getAllItems,
  selectItem,
  itemsByCategory,
  getCategoriesAndSneakerCount,
  getNameOfCategories,
  insertItem,
  updateItem,
  deleteItem
}