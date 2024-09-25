'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rezervacijas', [
      {
        datum: new Date('2024-09-12'),
        vreme: '18:00:00',
        broj_osoba: 4,
        ime_rezervacije: 'Petar Petrović',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        datum: new Date('2024-09-13'),
        vreme: '19:00:00',
        broj_osoba: 2,
        ime_rezervacije: 'Ivana Ivanović',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        datum: new Date('2024-09-14'),
        vreme: '20:00:00',
        broj_osoba: 6,
        ime_rezervacije: 'Marko Marković',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rezervacijas', null, {});
  }
};
