const router = require("express").Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
// const reviewRoutes = require("./reviewRoutes"); FUTURE DEVELOPMENT
const gameListRoutes = require("./gameListRoutes");
const categoryRoutes = require("./categoryRoutes");
const gameCategoryBridgeRoutes = require("./gameCategoryBridgeRoutes");

router.use("/users", userRoutes);
router.use("/game", gameRoutes);
// router.use("/review", reviewRoutes); FUTURE DEVELOPMENT
router.use("/gamelist", gameListRoutes);
router.use("/category", categoryRoutes);
router.use("/gcb", gameCategoryBridgeRoutes);

module.exports = router;
