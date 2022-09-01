const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });
const cloudinary = require("cloudinary").v2;

//CLOUDINARY CONFIG -- REQUIRED FOR CLOUDINARY
cloudinary.config({
  cloud_name: "dtcrmm1fs",
  api_key: "926534918754513",
  api_secret: process.env.API_SECRET,
  secure: true,
});
//IMPORT MODELS
const {
  Game,
  Category,
  Review,
  game_category_bridge,
} = require("../../models");

//ROUTE TO GET ALL GAMES
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

//ROUTE TO GET GAME BY ID
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

//ROUTE TO GET GAME BY NAME
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

//POST ROUTE USED IN FRONT END TO CREATE GAME INCLUDING AN IMAGE FROM USER
router.post("/", upload.single("uploaded_file"), async (req, res) => {
  try {
    //IF THE REQUEST HAS AN IMAGE IT WILL RUN THIS WAY
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        eager: [{ width: 300, height: 300, crop: "crop" }],
      });
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
      //BREAKS DOWN CATEGORIES TO INDIVIDUALS
      const categories = req.body.category_id.split(",").map((category) => {
        return { game_id: newGame.id, category_id: category };
      });
      //SENDS EACH OF THE NEW CATEGORIES TO GAMECATEGORYBRIDGE TO CREATE THE ASSOCIATIONS
      const bridge = await game_category_bridge.bulkCreate(categories);
      res.json(newGame);

      //IF THE REQUEST DOES NOT HAVE AN IMAGE IT WILL RUN THIS WAY
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
