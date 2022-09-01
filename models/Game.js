const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model { }

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    max_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    age_rating: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "category",
    //     key: "id",
    //   },
    // },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

    modelName: "game",
  }
);

module.exports = Game;
