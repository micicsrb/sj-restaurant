'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DnevniMeni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DnevniMeni.init({
    datum: {
      type: DataTypes.DATE,
      allowNull: false
    },
    naziv: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    opis: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'DnevniMeni',
  });
  return DnevniMeni;
};