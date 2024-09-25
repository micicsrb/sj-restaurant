'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JeloSastojak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Jelo, Sastojak }) {
      this.belongsTo(Jelo, { foreignKey: 'jelo_id', as: 'jelo' });
      this.belongsTo(Sastojak, { foreignKey: 'sastojak_id', as: 'sastojak' });
    }
  }

  JeloSastojak.init({
    jelo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Jelo',
        key: 'id'
      }
    },
    sastojak_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Sastojak',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'JeloSastojak',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['jelo_id', 'sastojak_id']
      }
    ]
  });

  return JeloSastojak;
};