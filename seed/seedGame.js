const { Game } = require("../models");

const gameData = [
  {
    name: "Munchkin",
    description:
      "A classic dungeon crawler where you can either work with your friends or work against them and sabotage them! Everyone starts at level 1and the goal is to reach level 10.",
    min_players: 2,
    max_players: 6,
    duration: "1-2",
    age_rating: "9+",
    image_url:
      "http://res.cloudinary.com/dtcrmm1fs/image/upload/v1662043441/pogetoomiue9u81ewumc.webp",
  },
  {
    name: "War",
    description: "top card wins, if they match then war ensues!",
    min_players: 2,
    max_players: 2,
    duration: "0-1",
    age_rating: "4+",
    category_id: 2,
    image_url:
      "https://res.cloudinary.com/dtcrmm1fs/image/upload/v1662045724/war_sjtijg.webp",
  },
  {
    name: "Spades",
    description:
      "Players get 13 cards and the goal is to get the most tricks in your favor!",
    min_players: 2,
    max_players: 4,
    duration: "0-1",
    age_rating: "9+",
    category_id: 2,
    image_url:
      "https://res.cloudinary.com/dtcrmm1fs/image/upload/v1662045724/war_sjtijg.webp",
  },
  {
    name: "Fluxx",
    description:
      "A game with ever changing goals and rules, act quick or someone might change the goal!",
    min_players: 2,
    max_players: 6,
    duration: "0-1",
    age_rating: "7+",
    image_url:
      "https://res.cloudinary.com/dtcrmm1fs/image/upload/v1662047442/fluxx_hmljbg.webp",
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
  {
    name: "Exploding Kittens",
    description:
      "You and your friends take turns drawing cards until someone draws an Exploding Kitten, then BOOM, that player is eliminated from the game! Play until one player is left.",
    min_players: 2,
    max_players: 5,
    duration: "0-1",
    age_rating: "7+",
    image_url:
      "http://res.cloudinary.com/dtcrmm1fs/image/upload/v1662045240/ctbkcx7azbbino4t8ani.webp",
  },
];
const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;
