const { DataTypes, VIRTUAL } = require("sequelize");
const sequelize = require("../database");
const DishCategory = require("./DishCategory");
const Food = require("./Food");
const User = require("./User");
const FavoriteFood = require("./FavoriteFood");
const ConsumedWater = require("./ConsumedWater");

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
    favorite_food_id: {
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

Dish.beforeDestroy(async (dish, options) => {
  try {
    const dishId = dish.dish_id;
    await DishItem.destroy({ where: { dish_id: dishId } });
    await DishComment.destroy({ where: { dish_id: dishId } });
  } catch (error) {
    console.log(error);
  }
});

Dish.beforeBulkDestroy(async (options) => {
  const userId = options.where.user_id;
  const dishes = await Dish.findAll({ where: { user_id: userId } });
  await Promise.all(dishes.map((dish) => dish.destroy()));
});

User.beforeDestroy(async (user, options) => {
  try {
    const userId = user.user_id;
    await Dish.destroy({ where: { user_id: userId } });
    await DishComment.destroy({ where: { user_id: userId } });
    await FavoriteFood.destroy({ where: { user_id: userId } });
    await ConsumedWater.destroy({ where: { user_id: userId } });
  } catch (error) {
    console.log(error);
  }
});

FavoriteFood.beforeDestroy(async (favoriteFood, options) => {
  try {
    const id = favoriteFood.favorite_food_id;
    await DishItem.destroy({
      where: {
        favorite_food_id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

DishItem.belongsTo(Dish, { foreignKey: "dish_id" });
DishItem.belongsTo(FavoriteFood, { foreignKey: "favorite_food_id" });
FavoriteFood.hasMany(DishItem, { foreignKey: "favorite_food_id" });
DishComment.belongsTo(Dish, { foreignKey: "dish_id" });
DishComment.belongsTo(User, { foreignKey: "user_id" });
Dish.belongsTo(DishCategory, { foreignKey: "category_id" });
Dish.belongsTo(User, { foreignKey: "user_id" });
Dish.hasMany(DishItem, { foreignKey: "dish_id", onDelete: "CASCADE" });
Dish.hasMany(DishComment, { foreignKey: "dish_id", onDelete: "CASCADE" });
User.hasMany(Dish, { foreignKey: "user_id" });

module.exports = { Dish, DishItem, DishComment };
