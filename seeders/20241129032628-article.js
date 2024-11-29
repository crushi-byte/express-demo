"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const article = {
        title: `文章标题 ${i}`,
        content: `文章内容 ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      articles.push(article);
    }
    await queryInterface.bulkInsert("Articles", articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
