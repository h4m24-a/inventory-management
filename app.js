const express = require('express')
require('dotenv').config();
const PORT = process.env.PGPORT;
let path = require('path');
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
require('dotenv').config();

const app = express();

// serve static files
app.use(express.static('public'));    // 'public' is our static folder.



// Body parser middleware
app.use(express.json());  // submit raw json
app.use(express.urlencoded({ extended: true }));  // takes in an object - replicates web form and sends form data.

// Session setup
app.use(session({   // initializes sessions with a secure secret, avoids unnecessary saves, and only creates sessions when necessary
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


// Initialize Passport
app.use(passport.initialize());

// session-based authentication
app.use(passport.session()); // integrates Passport.js with the session, enabling persistent login sessions where users remain authenticated across requests after logging in.


app.use(flash()); // Initialize connect-flash


app.use((req, res, next) => {
  res.locals.currentUser = req.user;    // currentUser is now available in every .ejs file
  next();
});



// Global route protection: redirect to login page if not authenticated
app.use((req, res, next) => {
  if (req.path === '/auth/log-in' || req.path === '/auth/sign-up' || req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/log-in')
})


// Routers
let indexRouter = require('./routes/index');
let categoriesRouter = require('./routes/categoriesRouter');
let itemsRouter = require('./routes/itemsRouter');
let authRouter = require('./auth/authRoutes');


//  There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). 
//  Then we set the 'view engine' value to specify the template library (in this case "ejs").
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')




// Adding route-handling code to the request handling chain. This will define particular routes for the different parts of the site
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `)
})




