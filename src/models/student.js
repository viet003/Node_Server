'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student.hasOne(models.svAccount, {
        foreignKey: 'userid', // Tên trường trong bảng svAccount lưu khóa ngoại
        as: 'studentAccount', // Bí danh cho mối quan hệ
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      student.belongsToMany(models.topic, {
        through: 'group',
        foreignKey: 'studentid', // Tên cột khóa ngoại của mô hình student trong bảng trung gian
        otherKey: 'topicid', // Tên cột khóa ngoại của mô hình topic trong bảng trung gian
      })
      student.hasMany(models.comment, {
        foreignKey: 'userid', // Tên trường trong bảng svAccount lưu khóa ngoại
        as: 'commentbyuser' // Bí danh cho mối quan hệ
      });
    }
  }
  student.init({
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    major: DataTypes.STRING,
    class: DataTypes.STRING,
    department: DataTypes.STRING,
    isActive: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};