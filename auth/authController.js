const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Function to render signup form
async function getSignUp(req, res) {
  try {
    res.render('signup_form')
  } catch (error) {
    console.error('Error displaying sign up form', error);
    res.status(500).send('Server Error');
  }
}


// Function to add user to database
async function signUpPost(req, res, next) {

  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    // Return validation errors to the user
    return res.status(400).render('signup_form', { 
      errors: errors.array() 
    });
  }


  try {
    const username = req.body.username;   // get username data from form
    const password = req.body.password;   // get password from from form

    // Hash password with bcrypt
    bcrypt.hash(password, 10, async(error, hashedPassword) => {   // 10 is number of salt rounds.
      if(error) {
        return next(error)
      }

      await db.insertUser(username, hashedPassword)   // call db the function that inserts the username & hashed password obtained from form in the db.
    })

    
    res.redirect('/');  // Redirect to the homepage after successful sign-up
  } catch (error) {
    return next (error)
  }
}




// Function to render login page
async function getLogIn(req, res) {
  try {
    res.render('login_form');
  } catch (error) {
    console.error('Error displaying log in form', error);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  getSignUp,
  signUpPost,
  getLogIn
}