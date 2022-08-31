const { User } = require("../models");

const categoryData = [
  {
    first_name: "Ryan",
    last_name: "Buckley",
    username: "Buckimus",
    email: "ryan42buck@gmail.com",
    password: "password",
  },
  {
    first_name: "Ryan",
    last_name: "Dooley",
    username: "RDoolz",
    email: "rdoolz@gmail.com",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(categoryData);

module.exports = seedUser;
