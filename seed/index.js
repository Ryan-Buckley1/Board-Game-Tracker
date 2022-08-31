const sequelize = require("../config/connection");
const seedCategory = require("./seedCategory");
const seedGame = require("./seedGame");
const seedGameCategoryBridge = require("./seedGameCategoryBridge");
const seedGameList = require("./seedGameList");
const seedUser = require("./seedUser");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedCategory();

  await seedGame();

  await seedGameCategoryBridge();

  await seedGameList();

  process.exit(0);
};

seedAll();
