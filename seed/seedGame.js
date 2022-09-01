const { Game } = require("../models");

const gameData = [
  {
    name: "Munchkin",
    description:
      "A classic dungeon crawler where you can either work with your friends or work against them and sabotage them! Everyone starts at level 1and the goal is to reach level 10.r",
    min_players: 2,
    max_players: 6,
    duration: "1-2",
    age_rating: "9+",
    image_url:
      "http://res.cloudinary.com/dtcrmm1fs/image/upload/v1662043441/pogetoomiue9u81ewumc.webp",
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
  {
    name: "7 Wonders Duel",
    description:
      "A 2-player game where players race through the ages creating wonders with the hope to take the opponents capital through military force, out smart the opponent by gaining the most scientific symbols, or by having the most points at the end of the game!",
    min_players: 2,
    max_players: 2,
    duration: "0-1",
    age_rating: "9+",
    image_url:
      "http://res.cloudinary.com/dtcrmm1fs/image/upload/v1662042419/myuerrcg9p3xchmtrktx.webp",
  },
];
const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;
