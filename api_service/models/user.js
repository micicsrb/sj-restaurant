"use strict"
const {
    Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({Narudzbina}) {
            this.hasMany(Narudzbina, {foreignKey: "user_id", as: "narudzbine"})
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize, modelName: "User"
    })
    return User
}
