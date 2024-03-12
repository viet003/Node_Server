'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
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
    // await queryInterface.addConstraint('posts', {
    //   fields: ['userid'],
    //   type: 'foreign key',
    //   name: 'fk_userid',
    //   references: {
    //     table: 'adAccounts',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE', // Xóa bài viết khi tài khoản quảng cáo bị xóa
    //   onUpdate: 'CASCADE' // Cập nhật userId trong bài viết khi userId của tài khoản quảng cáo được cập nhật
    // });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};