const { DataTypes, VIRTUAL } = require("sequelize");
const sequelize = require("../database");
const DishCategory = require("./DishCategory");
const Food = require("./Food");
const User = require("./User");

const Dish = sequelize.define(
  "Dish",
  {
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vitaminC: VIRTUAL,
    carbohydrates: VIRTUAL,
    protein: VIRTUAL,
    kcal: VIRTUAL,
    saturated: VIRTUAL,
    monounsaturated: VIRTUAL,
    polyunsaturated: VIRTUAL,
    sodium: VIRTUAL,
    iron: VIRTUAL,
    calcium: VIRTUAL,
    potassium: VIRTUAL,
    magnesium: VIRTUAL,
    zinc: VIRTUAL,
  },
  {
    tableName: "Dish",
  }
);

const DishItem = sequelize.define(
  "DishItem",
  {
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    food_id: {
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
    tableName: "DishItem",
    timestamps: false,
  }
);

const DishComment = sequelize.define(
  "DishComment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "DishComment",
  }
);

Dish.beforeBulkDestroy(async (options) => {
  const dishId = options.where.dish_id;
  try {
    const dishItems = await DishItem.findAll({
      where: { dish_id: dishId },
    });
    await Promise.all(dishItems.map((item) => item.destroy()));
  } catch (error) {
    console.log(error);
  }
});

DishItem.belongsTo(Dish, { foreignKey: "dish_id" });
DishItem.belongsTo(Food, { foreignKey: "food_id" });
DishComment.belongsTo(Dish, { foreignKey: "dish_id" });
DishComment.belongsTo(User, { foreignKey: "user_id" });
Dish.belongsTo(DishCategory, { foreignKey: "category_id" });
Dish.belongsTo(User, { foreignKey: "user_id" });
Dish.hasMany(DishItem, { foreignKey: "dish_id", onDelete: "CASCADE" });
Dish.hasMany(DishComment, { foreignKey: "dish_id", onDelete: "CASCADE" });

module.exports = { Dish, DishItem, DishComment };
