'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('narudzbinas', [
      {
        id: 1,
        vreme_narucivanja: new Date(),
        zakazano_vreme: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
        status: 'Pending',
        adresa: '123 Main St',
        telefon: '123-456-7890',
        ime_prezime: 'John Doe',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        vreme_narucivanja: new Date(),
        zakazano_vreme: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        status: 'Confirmed',
        adresa: '456 Elm St',
        telefon: '987-654-3210',
        ime_prezime: 'Jane Smith',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('narudzbinas', null, {});

  }
};
