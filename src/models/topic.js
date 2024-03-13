'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      topic.belongsTo(models.lecturer, {
        foreignKey: 'lecturerid', // Tên trường trong bảng topic lưu khóa ngoại
        as: 'lecturerTopic' // Bí danh cho mối quan hệ
      });
      topic.belongsToMany(models.student, {
        through: 'group', // Tên của bảng trung gian
        foreignKey: 'topicid', // Tên trường khóa ngoại của topic trong bảng trung gian
        otherKey: 'studentid', // Tên trường khóa ngoại của student trong bảng trung gian
      });
      topic.hasMany(models.announcement, {
        foreignKey: 'topicid', // Tên trường trong bảng topic lưu khóa ngoại
        as: 'announcements'
      })
    }
  }
  topic.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    schoolyear: DataTypes.STRING,
    lecturerid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'topic',
  });
  return topic;
};