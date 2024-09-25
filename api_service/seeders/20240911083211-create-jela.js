"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("jelos", [{
            id: "1",
            naziv: "Vegeterijana",
            opis: "masna",
            cena: 1200,
            kategorija_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: "2",
            naziv: "Kobasica",
            opis: "posna",
            cena: 300,
            kategorija_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("jelos", null, {})
    }
}
