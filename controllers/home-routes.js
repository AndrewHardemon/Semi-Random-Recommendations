const router = require("express").Router();
const checkAuthenticated = require("../helpers/checkAuthenticated")
const { List, Item, User } = require("../models/");
require("dotenv").config();





router.get("/home", checkAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {include:[List]})
    const user = userData.get({ plain: true })
    console.log(user)
    res.render("home", { 
      name: req.session.username, 
      home: true,
      lists: user.lists
    })
  } catch(err) {
    console.log(err)
    res.json(err.message)
  }
});

router.get("/profile", checkAuthenticated, async (req, res) => {
  res.render("settings", { 
    name: req.session.username, 
    email: req.session.email, 
    home: true 
  })
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/register", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("register");
});

router.get("/lists", checkAuthenticated, async (req, res) => {
  //Get all lists
  try {
    const userListsData = await List.findAll({where:{user_id:req.session.userId}, include:[Item]})
    const userLists = userListsData.map((list) => list.get({ plain: true }))
    console.log(userLists)
    res.render("lists", { 
      name: req.session.username, 
      userLists,
      lists: true 
    });
  } catch(err){
    console.log(err)
    res.json(err.message)
  }
});

router.get("/lists/:id", checkAuthenticated, async (req, res) => {
  //Get all lists
  try {
    const userListsData = await List.findAll({where:{user_id: req.session.userId}, include:[Item]})
    const userListsArr = userListsData.map(list => list.get({ plain: true }))
    const userLists = userListsArr.find(list => {
      console.log(list)
      return list.id == req.params.id
    })
    console.log(userLists)
    res.render("lists", { 
      name: req.session.username, 
      userLists: userListsArr,
      items: userLists.items,
      lists: true 
    });
  } catch(err){
    console.log(err)
    res.json(err.message)
  }
});

router.get("/games", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {include:[List]})
    const user = userData.get({ plain: true })
    console.log(user)
    res.render("game", { 
      name: req.session.username, 
      games: true,
      lists: user.lists
    })
  } catch(err) {
    console.log(err)
    res.json(err.message)
  }
});

router.get("/guestGames", async (req, res) => {
  res.render("game");
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/guestGames")
    });
  } else {
    res.status(400).end();
  }
});

router.get("/", async (req, res) => {
  res.render("index", { index: true });
});

router.get("*", async (req, res) => {
  res.render("404");
});

module.exports = router;