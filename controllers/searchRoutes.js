const { Game, User, Category, game_category_bridge } = require("../models");
const router = require("express").Router();

//ROUTE TO RENDER SINGLE GAME VIEW WHEN THE USER SEARCHES FOR A GAME BY NAME
router.get("/game/:name", async (req, res) => {
  try {
    const oneGame = await Game.findOne({
      where: {
        name: req.params.name,
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
    console.log(game);
    res.render("single-game-view", { game });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//ROUTE TO RENDER THE SINGLE CATEGORY PAGE WHEN A USER SEARCHES A CATEGORY BY NAME
router.get("/category/:name", async (req, res) => {
  try {
    const catGames = await Category.findOne({
      where: {
        category_name: req.params.name,
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
