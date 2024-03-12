'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      adAccount.hasMany(models.post, {
        foreignKey:'userid',
        as: 'adpost'
      })
    }
  }
  adAccount.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isactive: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'adAccount',
  });
  return adAccount;
};