"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "分类名称已存在" },
        validate: {
          notNull: {
            msg: "分类名称不能为空",
          },
          notEmpty: {
            msg: "分类名称不能为空",
          },
          len: {
            args: [2, 20],
            msg: "分类名称长度在2-20位",
          },
        },
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "排序不能为空",
          },
          notEmpty: {
            msg: "排序不能为空",
          },
          isInt: {
            msg: "排序必须是整数",
          },
          isPositive(value) {
            if (value <= 0) {
              throw new Error("排序必须是正数");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
