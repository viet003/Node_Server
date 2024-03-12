'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('svAccounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userid: {
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
    // Thêm ràng buộc ngoại tuyến giữa 'posts' và 'adAccounts'
    // await queryInterface.addConstraint('svAccounts', {
    //   fields: ['userid'],
    //   type: 'foreign key',
    //   name: 'fk_userid',
    //   references: {
    //     table: 'students',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE', // Xóa bài viết khi tài khoản quảng cáo bị xóa
    //   onUpdate: 'CASCADE' // Cập nhật userId trong bài viết khi userId của tài khoản quảng cáo được cập nhật
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('svAccounts');
  }
};