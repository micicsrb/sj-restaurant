"use strict"
const {
    Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Zaposleni extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Zaposleni.init({
        ime: {
            type: DataTypes.STRING, allowNull: false
        }, prezime: {
            type: DataTypes.STRING, allowNull: false
        }, pozicija: {
            type: DataTypes.STRING, allowNull: false
        }, datum_zaposlenja: {
            type: DataTypes.DATE, allowNull: false
        }, plata: {
            type: DataTypes.DECIMAL, allowNull: false
        }
    }, {
        sequelize, modelName: "Zaposleni"
    })
    return Zaposleni
}