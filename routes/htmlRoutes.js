
module.exports = function(app, passport) {
  
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/home", checkAuthenticated, function(req, res) {
    res.render("home", {name: req.user.firstName})  
  });

  
  app.get("/login", function(req, res) {
    res.render("login");
  });
  
  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    faliureFlash: true
  }));

  app.post("/login", passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/login',
    faliureFlash: true
  }));

  app.get("/lists", checkAuthenticated, function(req, res) {
    res.render("lists");
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
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

