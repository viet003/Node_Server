'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      announcement.belongsTo(models.topic, {
        foreignKey: 'topicid',
        as: 'announcements'
      });
      announcement.belongsTo(models.lecturer, {
        foreignKey: 'userid',
        as: 'author'
      });
      announcement.hasMany(models.comment, {
        foreignKey: 'announcementid',
        as: 'comments'
      });
    }
    
    
  }
  announcement.init({
    topicid: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'announcement',
  });
  return announcement;
};