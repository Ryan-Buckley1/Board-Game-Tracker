const { Category } = require("../models");

const router = require("express").Router();

router.get("/game", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
        attributes: ['category_name']
    });
  } catch (error) {}
});
module.exports = router