const router = require("express").Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
const reviewRoutes = require("./reviewRoutes");
const gameListRoutes = require("./gameListRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/users", userRoutes);
router.use("/game", gameRoutes);
router.use("/review", reviewRoutes);
router.use("/gamelist", gameListRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
