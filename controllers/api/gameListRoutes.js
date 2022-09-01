const router = require("express").Router();
const { Game, User, GameList } = require("../../models");

//ROUTE TO GET ALL GAMELISTS
router.get("/", async (req, res) => {
  try {
    const allGameLists = await GameList.findAll({
      attributes: ["id", "ownership", "favorite", "game_id", "user_id"],
      include: [
        {
          model: Game,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    res.json(allGameLists);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//ROUTE TO GET A SINGLE USERS GAME LIST
router.get("/:user_id", async (req, res) => {
  try {
    const userGameList = await GameList.findOne({
      where: {
        user_id: req.params.user_id,
      },
      attributes: [
        "id",
        "ownership",
        "favorite",
        "wishlist",
        "game_id",
        "user_id",
      ],
      include: [
        {
          model: Game,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    if (!userGameList) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }
    res.json(userGameList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//ROUTE TO POST A GAMESLIST THROUGH INSOMNIA/SEED
router.post("/", async (req, res) => {
  try {
    const newList = await GameList.create({
      user_id: req.session.userId,
      game_id: req.body.game_id,
      wishlist: req.body.wishlist,
      favorite: req.body.favorite,
      ownership: req.body.ownership,
    });
    res.json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//ROUTE FOR USER TO CHANGE THEIR PREFERENCES (WISHLIST, OWNED, FAVORITE) -- USED IN FRONT END
router.put("/userPref/:game_id", async (req, res) => {
  try {
    //CHECKS TO SEE IF THE USER ALREADY HAS AN ENTRY FOR THE GAME THEY ARE VIEWING
    const existingPref = await GameList.findOne({
      where: {
        user_id: req.session.userId,
        game_id: req.params.game_id,
      },
    });
    if (!existingPref) {
      //IF THEY DON'T THEN IT WILL CREATE A NEW ONE
      const newPref = await GameList.create({
        user_id: req.session.userId,
        game_id: req.params.game_id,
        ownership: req.body.ownership,
        favorite: req.body.favorite,
        wishlist: req.body.ownership,
      });
      res.json(newPref);
      return;
    }

    //IF THEY DO IT WILL UPDATE THE ONE THEY CURRENTLY HAVE
    const updatedPref = await GameList.update(req.body, {
      where: {
        user_id: req.session.userId,
        game_id: req.params.game_id,
      },
    });
    res.json(updatedPref);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
