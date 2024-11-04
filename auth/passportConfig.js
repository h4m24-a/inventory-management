// Passport setup (strategy, serialization)
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require('bcryptjs');

// setting up localStrategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByUsername(username); // fetch user by username

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        // passwords don't match!
        return done(null, false, { message: "Incorrect Password" });
      }

      // If the passwords match: The user is successfully authenticated, and done(null, user) would be called, allowing the login to proceed.
      // If everything is correct, return the user object
      return done(null, user);

    } catch (error) {
      return done(error);
    }
  })
);



// Sessions, serialize and deserialize
passport.serializeUser((user, done) => {  //  decides what user data should be stored in the session when the user logs in.
  done(null, user.id) // Passport stores only the user's ID in the session instead of the entire user object.
});


passport.deserializeUser(async (id, done) => {  // used to retrieve the full user information from the database when the session is active
  try {
    const user = await db.selectUserById(id); // The query is based on ID, so there will only be one matching user. Finds user by id

    done(null, user);   //  passes the retrieved user back to Passport. User us the full user object that passport attaches to req.user and can be used in middleware or router handler after a sucessfull authentication.
  } catch (error) {
    done (error)
  }
})


module.exports = passport;