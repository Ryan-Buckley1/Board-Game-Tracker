const User = require("./User");
const Category = require("./Category");
const Review = require("./Review");
const Game = require("./Game");
const GameList = require("./GameList");
const game_category_bridge = require("./game_category_bridge");

// User.hasMany(Review); FUTURE DEVELOPMENT
User.hasMany(Game);
User.hasMany(GameList, { foreignKey: "user_id" });

// Review.belongsTo(User); FUTURE DEVELOPMENT
// Review.belongsTo(Game); FUTURE DEVELOPMENT

// Game.hasMany(Review); FUTURE DEVELOPMENT
Game.belongsToMany(Category, { through: game_category_bridge });
Game.hasMany(GameList, { foreignKey: "game_id" });

Category.belongsToMany(Game, { through: game_category_bridge });

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
