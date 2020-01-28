if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var express = require('express')
var db = require("./models");

var app = express()
var PORT = process.env.PORT || 3000;
var bcrypt = require('bcrypt')
var passport = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override') 

//Serve static content for the app from the "public" directory in the application directory
app.use('/public', express.static('public'));

// Set Handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

var users = []
var userLists = []

app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// User Route
app.use('/user', require('./routes/user_routes.js'));

// catch 404 and forward to error handler
// app.use(function(req, res, next){
//   next(createError(404));
// })

//error handler
app.use(function(err,req,res,next){
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  //render the error page
  res.status(err.status || 500);
})

app.get('/', checkNotAuthenticated, function(req, res){
  res.render('index.handlebars')
})

app.get('/home', checkAuthenticated, function(req, res) {
  res.render('index.handlebars', { name: req.user.first })
})

app.get('/login', checkNotAuthenticated, function(req, res){
  res.render('login.handlebars')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
  
}))

app.get('/register',checkNotAuthenticated, function(req, res){
  res.render('register.handlebars')
})

app.get('/lists', checkAuthenticated, function(req, res) {
  res.render('lists.handlebars', {name: req.user.first})
})

app.post('/addList', checkAuthenticated, function(req,res){
  userLists.push({
    listName: req.body.listName,
  })
  res.render('lists.handlebars', {userLists: userLists, name: req.user.first})
})

app.post('/register', checkNotAuthenticated, async function(req, res){
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      first: req.body.firstName,
      last: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})


app.delete('/logout', function(req, res) {
  req.logOut()
  res.redirect('/')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

//app.listen(8080)

module.exports = app;