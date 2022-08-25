const router = require("express").Router();
const { Game, Category, Review } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allGames = await Game.findAll({
      attributes: ["id", "name", "description", "category_id"],
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Review,
          attributes: ["user_rating", "difficulty"],
        },
      ],
    });
    res.json(allGames);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleGame = await Game.findOne({
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
      ],
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Review,
          attributes: ["user_rating", "difficulty", "comment"],
        },
      ],
    });
    if (!singleGame) {
      res.status(404).json({ message: "No game found with this ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newGame = await Game.create({
      name: req.body.name,
      description: req.body.description,
      min_players: req.body.min_players,
      max_players: req.body.max_players,
      duration: req.body.duration,
      age_rating: req.body.age_rating,
      category_id: req.body.category_id,
    });
    res.json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//PUT (WITH AUTH FOR USER/ADMIN)

//DELETE (WITH AUTH FOR USER/ADMIN)
module.exports = router;
