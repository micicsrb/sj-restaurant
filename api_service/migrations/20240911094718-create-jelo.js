'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Jelos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      naziv: {
        type: Sequelize.STRING(120),
        unique: true,
        allowNull: false
      },
      opis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kategorija_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Jelos');
  }
};
