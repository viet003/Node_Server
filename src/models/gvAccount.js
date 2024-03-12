'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class gvAccount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            gvAccount.belongsTo(models.lecturer, {
                foreignKey: 'userid', // Tên trường trong bảng gvAccount lưu khóa ngoại
                as: 'lecturerAccount' // Bí danh cho mối quan hệ
            });
        }
    }
    gvAccount.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userid: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'gvAccount',
    });
    return gvAccount;
};