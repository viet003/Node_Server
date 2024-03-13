'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lecturer.hasOne(models.gvAccount, {
        foreignKey: 'userid', // Tên trường trong bảng gvAccount lưu khóa ngoại
        as: 'lecturerAccount' // Bí danh cho mối quan hệ
      });
      lecturer.hasMany(models.topic, {
        foreignKey: 'lecturerid', // Tên trường trong bảng gvAccount lưu khóa ngoại
        as: 'lecturerTopic' // Bí danh cho mối quan hệ
      });
      lecturer.hasMany(models.announcement, {
        foreignKey: 'userid', // Tên trường trong bảng gvAccount lưu khóa ngoại
        as: 'author' // Bí danh cho mối quan hệ
      });
    }
  }
  lecturer.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    major: DataTypes.STRING,
    department: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'lecturer',
  });
  return lecturer;
};