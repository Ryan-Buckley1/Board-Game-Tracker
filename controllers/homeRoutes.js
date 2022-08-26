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

module.exports = router;
