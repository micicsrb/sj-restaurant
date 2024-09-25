"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("kategorijas", [{
            id: "1", naziv: "Pizza", createdAt: new Date(), updatedAt: new Date()
        }, {
            id: "2", naziv: "Sendvič", createdAt: new Date(), updatedAt: new Date()
        }])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("kategorijas", null, {})
    }
}
