const router = require("express").Router();
const { game_category_bridge } = require("../../models");

//CREATED FOR SEED 
router.post("/", async (req, res) => {
  try {
    const newBridge = await game_category_bridge.create({
      category_id: req.body.category_id,
      game_id: req.body.game_id,
    });
    res.json(newBridge);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
