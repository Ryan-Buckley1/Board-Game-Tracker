const { Game } = require("../models");

const gameData = [
  {
    name: "munchkin",
    description: "all out war",
    min_players: 2,
    max_players: 6,
    duration: "1",
    age_rating: "2-3",
    category_id: 1,
  },
  {
    name: "war",
    description: "top card wins",
    min_players: 1,
    max_players: 2,
    duration: "1",
    age_rating: "2-3",
    category_id: 2,
  },
  {
    name: "spades",
    description: "fun card game",
    min_players: 1,
    max_players: 2,
    duration: "1",
    age_rating: "2-3",
    category_id: 2,
  },
  {
    name: "flux",
    description: "ever changing goals and rules",
    min_players: 1,
    max_players: 2,
    duration: "1",
    age_rating: "2-3",
    category_id: 2,
  },
];
const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;
