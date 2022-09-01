const router = require("express").Router();
const apiRoutes = require("./api");
const createRoutes = require("./createRoutes");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const searchRoutes = require("./searchRoutes");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/create", createRoutes);
router.use("/search", searchRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
