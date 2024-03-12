'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      group.belongsTo(models.topic, {
        foreignKey: 'topicid',
        as: 'topics'
      });
      group.belongsTo(models.student, {
        foreignKey: 'studentid',
        as: 'students'
      });
    }
    
    
  }
  group.init({
    name: DataTypes.STRING,
    studentid: DataTypes.STRING,
    topicid: DataTypes.STRING,
    isadded: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};