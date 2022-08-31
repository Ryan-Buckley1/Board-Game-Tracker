const { game_category_bridge } = require("../models");

const categoryData = [
  {
    game_id: 1,
    category_id: 1,
  },
  {
    game_id: 1,
    category_id: 2,
  },
  {
    game_id: 2,
    category_id: 2,
  },
  {
    game_id: 3,
    category_id: 2,
  },
  {
    game_id: 4,
    category_id: 2,
  },
];

const seedGameCategoryBridge = () =>
  game_category_bridge.bulkCreate(categoryData);

module.exports = seedGameCategoryBridge;
