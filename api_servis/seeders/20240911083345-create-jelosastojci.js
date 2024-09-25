'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jelosastojaks', [
      {
        jelo_id: 1,
        sastojak_id: 1
      },
      {
        jelo_id: 1,
        sastojak_id: 2
      },
      {
        jelo_id: 2,
        sastojak_id: 3
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jelosastojaks', null, {});
  }
};
