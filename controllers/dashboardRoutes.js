const router = require("express").Router();
const { GameList, Game } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/favorite", async (req, res) => {
  try {
    const favGames = GameList.findAll({
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

router.get("/wishlist", async (req, res) => {
  try {
    const wishGames = GameList.findAll({
      where: {
        user_id: req.session.userId,
        wishlist: true,
      },
      attributes: ["id", "user_id", "game_id", "wishlist"],
      include: [
        {
          model: Game,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    const wishGame = wishGames.map((game) => game.get({ plain: true }));
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

router.get("/ownership", async (req, res) => {
  try {
    const ownedGames = GameList.findAll({
      where: {
        user_id: req.session.userId,
        owned: true,
      },
      attributes: ["id", "user_id", "game_id", "ownership"],
      include: [
        {
          model: Game,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    const ownedGame = ownedGames.map((game) => game.get({ plain: true }));
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
