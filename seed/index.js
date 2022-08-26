const sequelize = require("../config/connection");
const seedCategory = require('./seedCategory');
const seedGame = require('./seedGame');
const seedGameCategoryBridge = require("./seedGameCategoryBridge");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedGame();

  await seedGameCategoryBridge();

  process.exit(0);
};

seedAll();
