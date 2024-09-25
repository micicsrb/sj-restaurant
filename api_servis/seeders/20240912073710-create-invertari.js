'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('inventars', [
      {
        id: 1,
        naziv: 'Tanjiri',
        kolicina: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        naziv: 'Viljuške',
        kolicina: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        naziv: 'Kašike',
        kolicina: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        naziv: 'Noževi',
        kolicina: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        naziv: 'Čaše za vodu',
        kolicina: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        naziv: 'Čaše za vino',
        kolicina: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        naziv: 'Stolnjaci',
        kolicina: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('inventars', null, {});
  }
};
