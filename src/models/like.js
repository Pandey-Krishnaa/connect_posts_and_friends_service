"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, {
        foreignKey: "post_id",
        onDelete: "cascade",
      });
    }
  }
  Like.init(
    {
      post_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Posts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
