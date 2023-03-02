const router = require("express").Router();
const checkAuthenticated = require("../helpers/checkAuthenticated")
// const { Post, Comment, User } = require("../models/");
require("dotenv").config();



router.get("/", function (req, res) {
  res.render("index", { index: true });
});

router.get("/home", checkAuthenticated, function (req, res) {
  res.render("home", { 
    name: req.session.username, 
    home: true 
  })
});

router.get("/profile", checkAuthenticated, function (req, res) {
  res.render("settings", { 
    name: req.session.username, 
    email: req.session.email, 
    home: true 
  })
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("register");
});

// router.post('/register', passport.authenticate('local-signup', {
//   successRedirect: '/login',
//   failureRedirect: '/register',
//   failureFlash: true
// }));

// router.post("/login", passport.authenticate('local-signin', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

router.get("/lists", checkAuthenticated, function (req, res) {
  //Get all lists
  res.render("lists", { 
    name: req.session.username, 
    lists: true 
  });
});

router.get("/games", function (req, res) {
  res.render("game", { 
    name: req.session.username, 
    games: true 
  });
});

router.get("/guestGames", function (req, res) {
  res.render("game");
});

router.get("/logout", function (req, res) {
  res.redirect("/api/logout");

});





router.get("*", function (req, res) {
  res.render("404");
});

module.exports = router;