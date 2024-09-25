'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StavkaNarudzbine extends Model {
        static associate({ Narudzbina, Jelo }) {
            this.belongsTo(Narudzbina, {foreignKey: 'narudzbina_id', as: 'narudzbina'});
            this.belongsTo(Jelo, {foreignKey: 'jelo_id', as: 'jelo'});
        }
    }

    StavkaNarudzbine.init({
        narudzbina_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jelo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        komada: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jedinicna_cena: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'StavkaNarudzbine',
    });
    return StavkaNarudzbine;
};