const router = require("express").Router();
const sequelize = require("sequelize");
const { GameList, Game, User, game_category_bridge } = require("../models");
const userAuth = require("../utils/userAuth");

//RENDERS DASHBOARD WITH THE USERS FAVORITE OWNED GAMES
router.get("/", userAuth, async (req, res) => {
  try {
    const favOwnedGames = await GameList.findAll({
      where: {
        user_id: req.session.userId,
        favorite: true,
        ownership: true,
      },
      attributes: ["id", "user_id", "game_id", "favorite"],
      include: [
        {
          model: Game,
          attributes: ["id", "name", "description", "image_url"],
        },
      ],
    });
    const favOwnedGame = favOwnedGames.map((game) => game.get({ plain: true }));
    res.render("dashboard", {
      favOwnedGame,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//RENDERS FAVORITE PAGE WITH USERS FAVORITE GAMES
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
          attributes: ["id", "name", "description", "image_url"],
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

//RENDERS WISHLIST PAGE WITH USERS WISHLIST OF GAMES
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
          attributes: ["id", "name", "description", "image_url"],
        },
      ],
    });
    console.log(wishGames);
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

//RENDERS OWNERSHIP PAGE WITH A LIST OF GAMES OWNED BY USER
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
          attributes: ["id", "name", "description", "image_url"],
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
