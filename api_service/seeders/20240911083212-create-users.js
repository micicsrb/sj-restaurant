"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                id: 1,
                username: 'john_doe',
                password: '$2b$10$qgOqxHjtkbvo2RmzYXmJe.yleE.LmH4vgL2Z00qjffmG5PhOyPVi6', // password: john_doe
                admin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                username: 'jane_smith',
                password: '$2b$10$NrBx4wmYGj9TJcjqqXbr0.4IBwgK1Q68Sq2SwK9liTLs1si0PEC1O', // password: jane_smith
                admin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
}
