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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // is_admin: false,
      }
      // { fields: ["email", "password"] }
    );
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loggedInUser = User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!loggedInUser) {
      res
        .status(400)
        .json({ message: "No user found with that email address" });
      return;
    }
    const validPassword = loggedInUser.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Password" });
      return;
    }
    req.session.user_id = loggedInUser.id;
    req.session.email = loggedInUser.email;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json({ user: loggedInUser, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
