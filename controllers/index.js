const router = require("express").Router();
const apiRoutes = require("./api");
const createRoutes = require('./createRoutes');


router.use("/api", apiRoutes);
router.use('/create', createRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
