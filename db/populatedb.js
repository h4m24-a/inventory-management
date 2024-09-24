#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg"); //  used to interact with the PostgreSQL database.


// SQL is a string containing SQL command
const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(20),
    image_filename VARCHAR
);

INSERT INTO categories (name)
VALUES
    ('Designer'),
    ('Running'),
    ('High Top')


CREATE TABLE IF NOT EXISTS items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(40),
    price NUMERIC(10, 2),
    size VARCHAR(10),
    category_id INTEGER REFERENCES categories (id)
);




INSERT INTO items (name, price, quantity, category_id, size)
VALUES
('Balenciaga Triple S', 1000, 5, 1, 'UK 9'),
('Gucci Rhyton', 1100, 3, 1, 'UK 8'),
('Prada Cloudbust', 900, 4, 1, 'UK 10');


INSERT INTO items (name, price, quantity, category_id, size)
VALUES
('Nike Air Jordan 1', 200, 10, 4, 'UK 10'),
('Converse Chuck Taylor All Star High Top', 80, 15, 4, 'UK 9'),
('Adidas NMD R1', 150, 8, 4, 'UK 10');


INSERT INTO items (name, price, quantity, category_id, size)
VALUES
('Nike Air Zoom Pegasus 40', 140, 12, 3, 'UK 10'),
('Adidas Ultraboost 22', 200, 7, 3, 'UK 9'),
('Asics Gel-Kayano 30', 180, 6, 3, 'UK 10');

`;



// NUMERIC(10, 2)  -- 10 digits in total, with 2 decimal places (pounds and pence)



async function main() {         // async function
  console.log('seeding...');    // logs seeding to console to indicate start of seeding process
  const client = new Client({   // A new instance of Client is created.
    connectionString: process.env.CONNECTION_STRING   // connectionString specifies the database connection details
  });
  await client.connect();   //  establishes a connection to the PostgreSQL database using the client.
  await client.query(SQL);  //  Executes the SQL commands defined in the SQL string.
  await client.end();       // This closes the connection to the database.
  console.log("done");      // logs done to console to indicate end of seeding process.
}

main();



// using the pg library, connects to a PostgreSQL database and seeds it with a table and some initial data