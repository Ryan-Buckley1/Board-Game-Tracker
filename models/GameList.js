const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GameList extends Model {}

GameList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ownership: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    wishlist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "game",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },

  {
    sequelize,

    timestamps: true,

    freezeTableName: true,

    underscored: true,

    modelName: "gamelist", //CHANGED CAUSE SQL DOES NOT LIKE game-list
  }
);

module.exports = GameList;
