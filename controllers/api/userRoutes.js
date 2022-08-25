const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["password"],
      },
      //ADD INCLUDES
    });
    if (!singleUser) {
      res.status(404).json({
        message: "No user found with that id.",
      });
      return;
    }
    res.json(singleUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(
      {
        email: req.body.email,
        password: req.body.password,
        is_admin: false,
      },
      { fields: ["email", "password"] }
    );
    req.session.email = newUser.email;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
module.exports = router;
