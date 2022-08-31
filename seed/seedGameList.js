const { GameList } = require("../models");

const categoryData = [
  {
    ownership: false,
    favorite: true,
    wishlist: true,
    game_id: 1,
    user_id: 1,
  },
  {
    ownership: true,
    favorite: false,
    wishlist: false,
    game_id: 4,
    user_id: 2,
  },
  {
    ownership: true,
    favorite: true,
    wishlist: true,
    game_id: 2,
    user_id: 1,
  },
  {
    ownership: false,
    favorite: false,
    wishlist: true,
    game_id: 3,
    user_id: 1,
  },
];

const seedGameList = () => GameList.bulkCreate(categoryData);

module.exports = seedGameList;
