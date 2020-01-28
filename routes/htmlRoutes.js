var db = require("../models");
var passport = require("passport");

module.exports = function(app, passport) {

  
  app.get("/", function(req, res) {
    res.render("index.handlebars");
  });

  app.get("/home", checkAuthenticated, function(req, res) {
    res.render("index.handlebars", { name: req.user.first });
  });

  app.get("/login", function(req, res) {
    res.render("login.handlebars");
  });

  app.post("/login",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  app.get("/register", function(req, res) {
    res.render("register.handlebars");
  });

  // app.post("/register", async function(req, res) {
  //   try {
  //     var hashedPassword = await bcrypt.hash(req.body.password, 10);
  //     users.push({
  //       id: Date.now().toString(),
  //       first: req.body.firstName,
  //       last: req.body.lastName,
  //       email: req.body.email,
  //       password: hashedPassword
  //     });
  //     res.redirect("/login");
  //   } catch {
  //     res.redirect("/register");
  //   }
  //   console.log(users);
  // });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/register'
  }
 
));

  app.get("/lists", checkAuthenticated, function(req, res) {
    res.render("lists.handlebars", { name: req.user.first });
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

  app.get("*", function(req, res) {
    res.render("404");
  });
};

