"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("zaposlenis", [
            {
                id: 1,
                ime: "Marko",
                prezime: "Marković",
                pozicija: "Kuvar",
                datum_zaposlenja: new Date("2022-01-15"),
                plata: 60000.00,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                ime: "Ana",
                prezime: "Anić",
                pozicija: "Konobar",
                datum_zaposlenja: new Date("2022-03-01"),
                plata: 45000.00,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id : 3,
                ime: "Jovan",
                prezime: "Jovanović",
                pozicija: "Menadžer",
                datum_zaposlenja: new Date("2021-11-01"),
                plata: 80000.00,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("zaposlenis", null, {})
    }
}
