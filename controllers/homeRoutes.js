const session = require("express-session");
const { Game, User, Category } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});


router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup", { loggedIn: req.session.loggedIn });
});

module.exports = router;
