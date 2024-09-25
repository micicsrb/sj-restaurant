"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("sastojaks", [{
            id: 1, naziv: "Šunka", createdAt: new Date(), updatedAt: new Date()
        }, {
            id: 2, naziv: "Kačkavalj", createdAt: new Date(), updatedAt: new Date()
        }, {
            id: 3, naziv: "Kečap", createdAt: new Date(), updatedAt: new Date()
        }, {
            id: 4, naziv: "Parizer", createdAt: new Date(), updatedAt: new Date()
        }, {
            id: 5, naziv: "Majonez", createdAt: new Date(), updatedAt: new Date()
        }])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("sastojaks", null, {})
    }
}
