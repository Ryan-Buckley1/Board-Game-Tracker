const session = require("express-session");
const { Game, User, Category, game_category_bridge } = require("../models");
const router = require("express").Router();

//RENDERS HOMEPAGE
router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//RENDERS LOGIN PAGE FOR USER TO LOG IN AT
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

//RENDERS SIGNUP SHEET FOR USER TO FILL OUT
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup", { loggedIn: req.session.loggedIn });
});

//RENDERS ALL GAMES PAGE WITH ALL OF THE GAMES CURRENTLY IN THE DB
router.get("/game", async (req, res) => {
  try {
    const allGames = await Game.findAll({
      attributes: ["id", "name", "description", "image_url"],
      include: {
        model: Category,
        attributes: ["id", "category_name"],
      },
    });
    const games = allGames.map((game) => game.get({ plain: true }));
    res.render("allGames", { games, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//RENDERS SINGLE GAME VIEW FOR A GAME THAT WAS SELECTED BY THE USER
router.get("/game/:id", async (req, res) => {
  try {
    const oneGame = await Game.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "name",
        "description",
        "min_players",
        "max_players",
        "duration",
        "age_rating",
        "image_url",
      ],
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });
    const game = oneGame.get({ plain: true });
    res.render("single-game-view", { game, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//RENDERS CATEGORIES PAGE FOR USER TO SEE ALL OF THE CATEGORIES CURRENTLY ON DB
router.get("/category", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );
    res.render("categories", { categories, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//RENDERS SINGLE CATEGORY PAGE FOR USER TO SEE WHAT GAMES ARE IN THAT CATEGORY
router.get("/category/:id", async (req, res) => {
  try {
    const catGames = await Category.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "category_name"],
      include: {
        model: Game,
        attributes: ["id", "name", "description", "image_url"],
        through: game_category_bridge,
      },
    });
    const category = catGames.get({ plain: true });
    res.render("single-category", { category, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
