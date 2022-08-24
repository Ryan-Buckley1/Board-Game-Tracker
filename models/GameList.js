const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class GameList extends Model { }

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
            defaultValue: false
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        wish_list: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    },

    {
        sequelize,

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'game-list'
    }
);

module.exports = GameList;