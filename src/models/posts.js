'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.adAccount, {
        foreignKey:'userid',
        as: 'adpost',
      })
    }
  }
  post.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    userid:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};