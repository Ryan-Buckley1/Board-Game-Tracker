const router = require("express").Router();
const { User } = require("../../models");

//GETS ALL USERS
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

//GETS USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["password"],
      },
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

//ADDS A NEW USER
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
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

//LOGIN ROUTE FOR USER TO SET UP SESSION TO BE ABLE TO ACCESS PARTS THAT REQUIRE USER TO BE LOGGED IN
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Mo user with that email address!" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Password!" });
      return;
    }
    req.session.userId = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json({ user: dbUserData, message: "You are now logged in!" });
      // res.json({ user: dbUserData });
    });
  });
});
// TODO: FIGURE OUT WHY THIS WONT WORK WITH ASYNC AWAIT
// router.post("/login", async (req, res) => {
//   try {
//     const loggedInUser = User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
//     if (!loggedInUser) {
//       res
//         .status(400)
//         .json({ message: "No user found with that email address" });
//       return;
//     }
//     const validPassword = await loggedInUser.checkPassword(req.body.password);
//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect Password" });
//       return;
//     }
//     req.session.user_id = loggedInUser.id;
//     req.session.email = loggedInUser.email;
//     req.session.loggedIn = true;
//     req.session.save(() => {
//       res.json({ user: loggedInUser, message: "You are now logged in!" });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });
//LOGS USER OUT AND ENDS THEIR SESSION
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
