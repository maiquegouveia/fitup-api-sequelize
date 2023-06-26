const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DishCategory = sequelize.define(
  "DishCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "DishCategory",
    timestamps: false,
  }
);

module.exports = DishCategory;
