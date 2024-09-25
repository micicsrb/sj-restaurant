'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('dnevnimenis', [
      {
        id: 1,
        datum: new Date('2024-09-13'),
        naziv: 'Letnji specijalitet',
        opis: 'Lagana letnja jela sa svežim sezonskim namirnicama.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        datum: new Date('2024-09-14'),
        naziv: 'Mediteranski ukusi',
        opis: 'Izbor mediteranskih jela sa maslinovim uljem i svežim začinima.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        datum: new Date('2024-09-15'),
        naziv: 'Tradicionalna kuhinja',
        opis: 'Domaća jela pripremljena po tradicionalnim receptima.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        datum: new Date('2024-09-16'),
        naziv: 'Internacionalni dan',
        opis: 'Izbor popularnih jela iz različitih svetskih kuhinja.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        datum: new Date('2024-09-17'),
        naziv: 'Vegetarijanski dan',
        opis: 'Raznovrsna ponuda ukusnih vegetarijanskih jela.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dnevnimenis', null, {});
  }
};
