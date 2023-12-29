"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, {
        foreignKey: "post_id", // This is the foreign key in the Attachment model
        targetKey: "id",
      });
    }
  }
  PostAttachment.init(
    {
      attachment_public_url: { type: DataTypes.STRING, allowNull: false },
      attachment_public_id: { type: DataTypes.STRING, allowNull: false },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Posts", // Name of the referenced model
          key: "id", // Name of the referenced key in the Post model
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "PostAttachment",
    }
  );
  return PostAttachment;
};
