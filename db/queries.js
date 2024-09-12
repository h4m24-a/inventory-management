const pool = require("./pool");

// sql query to get all categories
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




// Insert a new category
async function insertCategory(name) {
  try {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
  } catch (error) {
    console.error('An error occurred during query', error)
    throw error;
  }
}


// Get a category
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


module.exports = {
  getAllCategories,
  insertCategory,
  selectCategory,
  updateCategory,
  deleteCategory
}