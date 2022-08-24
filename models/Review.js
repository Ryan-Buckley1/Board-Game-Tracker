const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_rating: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                max: 5
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        difficulty: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            validate: {
                max: 5
            }
        }

    },

    {
        sequelize,

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'review'
    }
);

module.exports = Review;