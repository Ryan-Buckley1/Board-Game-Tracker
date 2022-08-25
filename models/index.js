const User = require('./User');
const Category = require('./Category');
const Review = require('./Review');
const Game = require('./Game');
const GameList = require('./GameList');

//create pseudo associations

//  Each User has one GameList

//  Each GameList has one User

//  Each GameList has many Games

User.hasMany(Review);
Review.belongsTo(User);
Game.hasMany(Review); //ADDED BY RB
Review.belongsTo(Game); // ADDED BY RB
Category.hasMany(Game);
//Game.belongsToMany(Category, { through:?});
GameList.hasOne(User);
User.belongsTo(GameList);

module.exports = { User, Category, Review, Game, GameList };