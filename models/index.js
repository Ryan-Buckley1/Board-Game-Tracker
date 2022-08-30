const User = require("./User");
const Category = require("./Category");
const Review = require("./Review");
const Game = require("./Game");
const GameList = require("./GameList");
const game_category_bridge = require("./game_category_bridge");

User.hasMany(Review);
User.hasMany(Game);
User.hasMany(GameList, { foreignKey: "user_id" });
// User.belongsToMany(Game, { through: GameList });

Review.belongsTo(User);
Review.belongsTo(Game);

Game.hasMany(Review);
Game.belongsToMany(Category, { through: game_category_bridge });
// Game.belongsTo(User)
Game.hasMany(GameList, { foreignKey: "game_id" });
// Game.hasMany(GameList);

Category.belongsToMany(Game, { through: game_category_bridge });

// GameList.belongsTo(User);
// GameList.hasMany(Game);
GameList.belongsTo(Game);
GameList.belongsTo(User);

module.exports = {
  User,
  Category,
  Review,
  Game,
  GameList,
  game_category_bridge,
};
