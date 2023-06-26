const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const ConsumedWater = sequelize.define(
  "ConsumedWater",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ConsumedWater",
  }
);

ConsumedWater.belongsTo(User, { foreignKey: "user_id" });

module.exports = ConsumedWater;
