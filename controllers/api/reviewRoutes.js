
//FUTURE DEVELOPMENT

// const { Review, User, Game } = require("../../models");

// const router = require("express").Router();

// //FUTURE DEVELOPMENT

// router.get("/", async (req, res) => {
//   try {
//     const allReviews = await Review.findAll({
//       attributes: ["id", "user_rating", "comment", "difficulty"],
//       include: [
//         {
//           model: User,
//           attributes: ["id", "email"],
//         },
//         {
//           model: Game,
//           attributes: ["id", "name"],
//         },
//       ],
//     });
//     res.json(allReviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const singleReview = await Review.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "user_rating", "comment", "difficulty", "created_at"],
//       include: [
//         {
//           model: User,
//           attributes: ["email"],
//         },
//         {
//           model: Game,
//           attributes: ["id", "name", "description"],
//         },
//       ],
//     });
//     if (!singleReview) {
//       res.status(404).json({ message: "No review found with this ID" });
//     }
//     res.json(singleReview);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// module.exports = router;
