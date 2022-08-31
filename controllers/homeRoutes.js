const session = require("express-session");
const { Game, User, Category, game_category_bridge } = require("../models");
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

router.get("/game", async (req, res) => {
  try {
    const allGames = Game.findAll({
      attributes: ["id", "name", "description"],
      include: {
        model: Category,
        attributes: ["id", "category_name"],
      },
    });
    const games = allGames.map((game) => game.get({ plain: true }));
    res.render("allGames", { games });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

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
      ],
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });
    const game = oneGame.get({ plain: true });
    console.log(game);
    res.render("single-game-view", { game });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

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

router.get("/category/:id", async (req, res) => {
  try {
    const catGames = await Category.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "category_name"],
      include: {
        model: Game,
        attributes: ["id", "name", "description"],
        through: game_category_bridge,
      },
    });
    const category = catGames.get({ plain: true });
    console.log(category);
    res.render("single-category", { category });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
