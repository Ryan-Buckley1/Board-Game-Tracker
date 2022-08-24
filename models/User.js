const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                len: [4]
            }
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },

    {
        hooks: {
            async beforeCreate (newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },

        sequelize,

        timestamps: true,

        freezeTableName: true,

        underscored: true,

        modelName: 'user'
    }
);

module.exports = User;