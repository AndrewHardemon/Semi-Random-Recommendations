require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
var passport = require("passport");

var bcrypt = require("bcrypt");
var flash = require("express-flash");
var session = require("express-session");
var methodOverride = require("method-override");
var initializePassport = require("./passport-config");
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);


//Middleware
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());

//Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
//For the logout
app.use(methodOverride("_method"));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// var users = [];

// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);

app.listen(8080)