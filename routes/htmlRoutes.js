module.exports = function(app, passport) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/home", checkAuthenticated, function(req, res) {
    res.render("home", {name: req.user.firstname})  
  });

  app.get("/games", checkAuthenticated, function(req, res) {
    res.render("game", {name: req.user.firstname})  
  });

  app.get("/profile", checkAuthenticated, function(req, res) {
    res.render("settings", {name: req.user.firstname, email: req.user.email});
  });

  app.get("/login", function(req, res) {
    res.render("login", {error: req.flash('error')});
  });
  
  app.get("/register", function(req, res) {
    res.render("register", {error: req.flash('error')});
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
  }));

  app.post("/login", passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get("/lists", checkAuthenticated, function(req, res) {
    res.render("lists", {name: req.user.firstname});
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");

  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  app.get("*", function(req, res) {
    res.render("404");
  });
};

