const router = require("express").Router();
const sequelize = require("sequelize");
const { GameList, Game, User, game_category_bridge } = require("../models");
const userAuth = require("../utils/userAuth");

router.get("/", userAuth, async (req, res) => {
  try {
    res.render("dashboard", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

//TODO: MAKE THE SEQUELIZE LITERAL WORK!
router.get("/favorite", userAuth, async (req, res) => {
  try {
    const favGames = await GameList.findAll({
      where: {
        user_id: req.session.userId,
        favorite: true,
      },
      attributes: ["id", "user_id", "game_id", "favorite"],
      include: [
        {
          model: Game,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    const favGame = favGames.map((game) => game.get({ plain: true }));
    console.log(favGame);
    res.render("favorite", {
      favGame,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/wishlist", userAuth, async (req, res) => {
  try {
    console.log(req.session.userId);

    const wishGames = await GameList.findAll({
      where: {
        user_id: req.session.userId,
        wishlist: true,
      },
      attributes: ["id", "user_id", "game_id", "wishlist"],
      include: [
        {
          model: Game,
          // foreignKey: "gamelist_id",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    // console.log(wishGames);
    const wishGame = wishGames.map((game) => game.get({ plain: true }));
    console.log(wishGame);
    res.render("wishlist", {
      wishGame,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/ownership", userAuth, async (req, res) => {
  try {
    const ownedGames = await GameList.findAll({
      where: {
        user_id: req.session.userId,
        ownership: true,
      },
      attributes: ["id", "user_id", "game_id", "favorite"],
      include: [
        {
          model: Game,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    const ownedGame = ownedGames.map((game) => game.get({ plain: true }));
    console.log(ownedGame);
    res.render("ownership", {
      ownedGame,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
