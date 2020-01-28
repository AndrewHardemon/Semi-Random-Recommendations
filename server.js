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


//Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);

//Passport strategies
require('./config/passport/passport.js')(passport, db.user);

//Sync Database
db.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

app.listen(8080, function(err){
  if(err) {
    console.log(err)
  } else {
    console.log('server is live')
  }

})