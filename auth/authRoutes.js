// Authentication routes
const express = require('express');
const router = express.Router();
const authController = require('../auth/authController')
const validators = require('../auth/validators');
const passport = require("../auth/passportConfig"); 


router.get('/sign-up', authController.getSignUp); // Renders sign up form
router.post('/sign-up', authController.signUpPost);  // submit signup form data

router.get('/log-in', authController.getLogIn); // Renders sign in form


router.post('/log-in', passport.authenticate('local', {   // when user submits a log in form, this route is triggered to process login attempt
  successRedirect: '/',               // passport.authenticate() is a middleware function provided by Passport.js to handle the authentication process.
  failureRedirect: '/auth/sign-up'    // "local" specifies the strategy being used for authentication.
}))



router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;