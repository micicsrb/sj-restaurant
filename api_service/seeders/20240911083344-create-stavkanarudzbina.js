'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stavkanarudzbines', [
      {
        id: 1,
        narudzbina_id: 1,
        jelo_id: 1,
        komada: 2,
        jedinicna_cena: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        narudzbina_id: 1,
        jelo_id: 2,
        komada: 1,
        jedinicna_cena: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        narudzbina_id: 2,
        jelo_id: 1,
        komada: 3,
        jedinicna_cena: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stavkanarudzbines', null, {});
  }
};
