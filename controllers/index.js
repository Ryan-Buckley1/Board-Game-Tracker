const router = require("express").Router();
const apiRoutes = require("./api");
const createRoutes = require("./createRoutes");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/create", createRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
