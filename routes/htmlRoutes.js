var db = require("../models");
var passport = require("passport");

module.exports = function(app, passport) {

  
  app.get("/", checkNotAuthenticated, function(req, res) {
    res.render("index.handlebars");
  });

  app.get("/home", checkAuthenticated, function(req, res) {
    res.render("index.handlebars", { name: req.user.first });
  });

  app.get("/login", checkNotAuthenticated, function(req, res) {
    res.render("login.handlebars");
  });

  app.post("/login", checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  app.get("/register", checkNotAuthenticated, function(req, res) {
    res.render("register.handlebars");
  });

  app.get("/lists", checkAuthenticated, function(req, res) {
    res.render("lists.handlebars", { name: req.user.first });
  });

  app.post("/register", checkNotAuthenticated, async function(req, res) {
    try {
      var hashedPassword = await bcrypt.hash(req.body.password, 10);
      users.push({
        id: Date.now().toString(),
        first: req.body.firstName,
        last: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      });
      res.redirect("/login");
    } catch {
      res.redirect("/register");
    }
    console.log(users);
  });

  app.delete("/logout", function(req, res) {
    req.logOut();
    res.redirect("/");
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }

    next();
  }

  app.get("*", function(req, res) {
    res.render("404");
  });
};

