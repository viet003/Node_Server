'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('students', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dob: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            major: {
                type: Sequelize.STRING,
                allowNull: false,
            }, 
            class: {
                type: Sequelize.STRING,
                allowNull: false,
            }, 
            department: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        //await queryInterface.addIndex('adAccounts', ['id']);

        // Thêm ràng buộc ngoại tuyến giữa 'posts' và 'adAccounts'

        // await queryInterface.addIndex('students', ['id']);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('students');
    }
};