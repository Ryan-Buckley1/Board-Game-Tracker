const User = require("./User");
const Category = require("./Category");
const Review = require("./Review");
const Game = require("./Game");
const GameList = require("./GameList");
const game_category_bridge = require('./game_category_bridge');

User.hasMany(Review);
User.hasMany(Game);
User.hasOne(GameList);

Review.belongsTo(User);
Review.belongsTo(Game);

Game.hasMany(Review);
Game.belongsToMany(Category, { through: game_category_bridge });
Game.belongsTo(User);

Category.belongsToMany(Game, { through: game_category_bridge });

GameList.belongsTo(User);
GameList.hasMany(Game);

module.exports = { User, Category, Review, Game, GameList, game_category_bridge };