"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostAttachments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attachment_public_url: {
        type: Sequelize.STRING,
      },
      attachment_public_id: {
        type: Sequelize.STRING,
      },
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Posts", // Name of the referenced model
          key: "id", // Name of the referenced key in the Post model
        },
        onDelete: "cascade",
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PostAttachments");
  },
};
