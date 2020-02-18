require("dotenv").config();

module.exports = function(app, passport) {

  app.get("/", function(req, res) {
    res.render("index", {index: true});
  });

  app.get("/home", checkAuthenticated, function(req, res) {
    res.render("home", {name: req.user.firstname, home: true})  
  });

  app.get("/api_key", function(req, res) {
    res.send(process.env.api_key);
  })

  app.get("/game_key", function(req, res) {
    res.send(process.env.game_key);
  })
  
  app.get("/profile", checkAuthenticated, function(req, res) {
    res.render("settings", {name: req.user.firstname, email: req.user.email, home: true})
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
    res.render("lists", {name: req.user.firstname, lists: true});
  });

  app.get("/games", function(req, res) {
    res.render("game", {name: req.user.firstname, games: true });
  });

  app.get("/guestGames", function(req, res) {
    res.render("game");
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

