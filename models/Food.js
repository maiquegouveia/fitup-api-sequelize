const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const FoodCategory = require("./FoodCategory");

const Food = sequelize.define(
  "Food",
  {
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    calcium: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    carbohydrates: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    iron: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    kcal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    magnesium: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    monounsaturated: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monounsaturated: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    polyunsaturated: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    potassium: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    protein: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    saturated: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sodium: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    vitaminC: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    zinc: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "Food",
    timestamps: false,
  }
);

Food.belongsTo(FoodCategory, { foreignKey: "category_id" });

module.exports = Food;
