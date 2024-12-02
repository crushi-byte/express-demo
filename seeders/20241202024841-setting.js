"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Settings",
      [
        {
          name: "长乐未央",
          icp: "ICP备2023000000号-1",
          copyright: "Copyright © 2023 Longle Yuan All Rights Reserved.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Settings", null, {});
  },
};
