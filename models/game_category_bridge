const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class game_category_bridge extends Model { }

game_category_bridge.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'game',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
        sequelize,

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'game_category_bridge'
    }
);

module.exports = game_category_bridge;