const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtcrmm1fs",
  api_key: "926534918754513",
  api_secret: process.env.API_SECRET,
  secure: true,
});

const {
  Game,
  Category,
  Review,
  game_category_bridge,
} = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allGames = await Game.findAll({
      attributes: ["id", "name", "description"],
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
      return;
    }
    res.json(singleGame);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const namedGame = await Game.findOne({
      where: {
        name: req.params.name,
      },
      attributes: ["id"],
    });
    if (!namedGame) {
      res.status(404).json({ message: "No game found with this name" });
    }
    res.json(namedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", upload.single("uploaded_file"), async (req, res) => {
  try {
    console.log("made it, yo");
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      const newGame = await Game.create({
        name: req.body.name,
        description: req.body.description,
        min_players: req.body.min_players,
        max_players: req.body.max_players,
        duration: req.body.duration,
        age_rating: req.body.age_rating,
        // user_id: req.session.userId,
        // category_id: req.body.category_id,
        image_url: uploadedImage.url,
      });
      const categories = req.body.category_id.split(",").map((category) => {
        console.log(category);
        return { game_id: newGame.id, category_id: category };
      });
      console.log(categories);
      const bridge = await game_category_bridge.bulkCreate(categories);
      res.json(newGame);
    } else {
      const newGame = await Game.create({
        name: req.body.name,
        description: req.body.description,
        min_players: req.body.min_players,
        max_players: req.body.max_players,
        duration: req.body.duration,
        age_rating: req.body.age_rating,
        // user_id: req.session.userId,
        // category_id: req.body.category_id,
      });
      const categories = req.body.category_id.split(",").map((category) => {
        console.log(category);
        return { game_id: newGame.id, category_id: category };
      });
      console.log(categories);
      const bridge = await game_category_bridge.bulkCreate(categories);
      res.json(newGame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//PUT (WITH AUTH FOR USER/ADMIN)

//DELETE (WITH AUTH FOR USER/ADMIN)
module.exports = router;
