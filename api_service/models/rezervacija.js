'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rezervacija.init({
    datum: {
      type: DataTypes.DATE,
        allowNull: false
    },
    vreme: {
      type: DataTypes.TIME,
      allowNull: false
    },
    broj_osoba: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ime_rezervacije: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rezervacija',
  });
  return Rezervacija;
};