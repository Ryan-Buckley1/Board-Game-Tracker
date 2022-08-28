const router = require("express").Router();
const { Game, User, GameList } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allGameLists = GameList.findAll({
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

router.get("/:user_id", async (req, res) => {
  try {
    const userGameList = await GameList.findOne({
      where: {
        user_id: req.params.user_id,
      },
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

router.put("favorite/:game_id", async (req, res) => {
  try {
    const updatedList = await GameList.update(
      {
        where: {
          user_id: req.session.userId,
          game_id: req.params.game_id,
        },
      },
      {
        favorite: req.body.favorite,
      }
    );
    if (!updatedList) {
      res
        .status(400)
        .json({ message: "No list found with that game id and user id" });
      return;
    }
    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("wishlist/:game_id", async (req, res) => {
  try {
    const updatedList = await GameList.update(
      {
        where: {
          user_id: req.session.userId,
          game_id: req.params.game_id,
        },
      },
      {
        wishlist: req.body.favorite,
      }
    );
    if (!updatedList) {
      res
        .status(400)
        .json({ message: "No list found with that game id and user id" });
      return;
    }
    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("ownership/:game_id", async (req, res) => {
  try {
    const updatedList = await GameList.update(
      {
        where: {
          user_id: req.session.userId,
          game_id: req.params.game_id,
        },
      },
      {
        ownership: req.body.favorite,
      }
    );
    if (!updatedList) {
      res
        .status(400)
        .json({ message: "No list found with that game id and user id" });
      return;
    }
    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
