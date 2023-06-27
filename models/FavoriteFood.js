const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Food = require("./Food");
const User = require("./User");

const FavoriteFood = sequelize.define(
  "FavoriteFood",
  {
    favorite_food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
User.hasMany(FavoriteFood, { foreignKey: "user_id" });
module.exports = FavoriteFood;
