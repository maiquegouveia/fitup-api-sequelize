const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Food = require("./Food");
const User = require("./User");

const FavoriteFood = sequelize.define(
  "FavoriteFood",
  {
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "FavoriteFood",
    timestamps: false,
  }
);

FavoriteFood.belongsTo(User, { foreignKey: "user_id" });
FavoriteFood.belongsTo(Food, { foreignKey: "food_id" });

module.exports = FavoriteFood;
