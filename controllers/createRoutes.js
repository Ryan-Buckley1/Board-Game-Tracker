const { Category } = require("../models");

const router = require("express").Router();

router.get("/game", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    const categories = allCategories.map((category) =>
      category.get({ plain: true })
    );
    res.render("addNewGame", { categories, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
module.exports = router;
