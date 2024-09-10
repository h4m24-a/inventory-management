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


module.exports = {
  getAllCategories,
}