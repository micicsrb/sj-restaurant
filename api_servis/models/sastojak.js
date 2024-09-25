'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sastojak extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Jelo }) {
            this.belongsToMany(Jelo, {through: 'JeloSastojak', foreignKey: 'sastojak_id', as: 'jela'});
        }
    }

    Sastojak.init({
        naziv: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Sastojak',
    });
    return Sastojak;
};