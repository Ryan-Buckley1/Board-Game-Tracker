const sequelize = require("../config/connection");
const seedCategory = require('./seedCategory')
const seedGame = require('./seedGame')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedGame();

  process.exit(0);
};

seedAll();
