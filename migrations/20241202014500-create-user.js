"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      sex: {
        defaultValue: 0,
        type: Sequelize.TINYINT,
      },
      company: {
        type: Sequelize.STRING,
      },
      introduce: {
        type: Sequelize.TEXT,
      },
      role: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("Users", {
      fields: ["email"], // 要索引的字段
      unique: true, // 是否唯一
    });
    await queryInterface.addIndex("Users", {
      fields: ["username"], // 要索引的字段
      unique: true, // 是否唯一
    });
    await queryInterface.addIndex("Users", {
      fields: ["role"], // 要索引的字段
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
