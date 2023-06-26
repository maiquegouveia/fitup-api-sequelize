const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const FoodCategory = sequelize.define(
  "FoodCategory",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "FoodCategory",
    timestamps: false,
  }
);

module.exports = FoodCategory;
