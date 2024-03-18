'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('topics', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            schoolyear: {
                type: Sequelize.STRING,
                allowNull:false
            },
            lecturerid: {
                type: Sequelize.STRING,
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
        // await queryInterface.addIndex('topics', ['id']);

        //await queryInterface.addIndex('adAccounts', ['id']);
        // Thêm ràng buộc ngoại tuyến giữa 'posts' và 'adAccounts'

        // await queryInterface.addConstraint('topics', {
        //     fields: ['lecturerid'],
        //     type: 'foreign key',
        //     name: 'fk_lecturerid',
        //     references: {
        //         table: 'lecturers',
        //         field: 'id'
        //     },
        //     onDelete: 'CASCADE', 
        //     onUpdate: 'CASCADE' 
        // });
        
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('topics');
    }
};