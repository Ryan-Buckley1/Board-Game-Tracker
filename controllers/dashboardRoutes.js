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
    const favGames = await User.findAll({
      where: {
        id: req.session.userId,
        // favorite: true,
      },
      attributes: [
        `id`,
        `first_name`,
        `last_name`,
        `username`,
        // [
        //   sequelize.literal(
        //     "(SELECT (name, description) FROM game WHERE id IN (SELECT game_id FROM gamelist WHERE favorite = 1 AND user_id = user.id)"
        //   ),
        //   "favGames",
        // ],
      ],
      include: [
        {
          model: Game,
          attributes: ["name", "description"],
          include: {
            model: GameList,
            attributes: ["favorite"],
          },
        },
      ],
    });
    // console.log(favGames);
    // const favGame = favGames.get({ plain: true });
    // console.log(favGame);
    const isFavorite = favGames.map((gmae) => gmae.get({ plain: true }));
    console.log(isFavorite);
    res.render("favorite", {
      favGames,
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
          foreignKey: "gamelist_id",
          attributes: ["id", "name", "description"],
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

router.get("/ownership", userAuth, async (req, res) => {
  try {
    const ownedGames = await GameList.findAll({
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
    res.render("dashboard", {
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
