'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class svAccount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            svAccount.belongsTo(models.student, {
                foreignKey: 'userid', // Tên trường trong bảng svAccount lưu khóa ngoại
                as: 'studentAccount', // Bí danh cho mối quan hệ
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    svAccount.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userid: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'svAccount',
    });
    return svAccount;
};