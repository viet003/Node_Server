'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('groups', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            studentid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            topicid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isadded: {
                type: Sequelize.TINYINT,
                allowNull: true,
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
        // await queryInterface.addConstraint('groups', {
        //     fields: ['topicid'],
        //     type: 'foreign key',
        //     name: 'fk_topicid',
        //     references: {
        //         table: 'topics',
        //         field: 'id'
        //     },
        //     onDelete: 'CASCADE', // Xóa bài viết khi tài khoản quảng cáo bị xóa
        //     onUpdate: 'CASCADE' // Cập nhật userId trong bài viết khi userId của tài khoản quảng cáo được cập nhật
        // });
        // await queryInterface.addConstraint('groups', {
        //     fields: ['studentid'],
        //     type: 'foreign key',
        //     name: 'fk_studentid',
        //     references: {
        //         table: 'students',
        //         field: 'id'
        //     },
        //     onDelete: 'CASCADE', // Xóa bài viết khi tài khoản quảng cáo bị xóa
        //     onUpdate: 'CASCADE' // Cập nhật userId trong bài viết khi userId của tài khoản quảng cáo được cập nhật
        // });
        // await queryInterface.addIndex('groups', ['id']);
        await queryInterface.addConstraint('groups', {
            fields: ['topicid', 'studentid'],
            type: 'unique',
            name: 'unique_topic_student_constraint'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('groups');
    }
};