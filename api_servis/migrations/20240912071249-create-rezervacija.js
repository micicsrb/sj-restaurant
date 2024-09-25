'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rezervacijas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      datum: {
        type: Sequelize.DATE,
        allowNull: false
      },
      vreme: {
        type: Sequelize.TIME,
        allowNull: false
      },
      broj_osoba: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ime_rezervacije: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rezervacijas');
  }
};