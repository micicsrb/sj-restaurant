'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StavkaNarudzbines', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      narudzbina_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jelo_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      komada: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jedinicna_cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('StavkaNarudzbines');
  }
};
