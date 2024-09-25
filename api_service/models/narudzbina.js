'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Narudzbina extends Model {
        static associate({ StavkaNarudzbine, User }) {
            this.hasMany(StavkaNarudzbine, {foreignKey: 'narudzbina_id', as: 'stavke'});
            this.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
        }
    }

    Narudzbina.init({
        vreme_narucivanja: {
            type: DataTypes.DATE,
            allowNull: false
        },
        zakazano_vreme: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresa: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        telefon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ime_prezime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Narudzbina',
    });
    return Narudzbina;
};