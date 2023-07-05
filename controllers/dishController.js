const DishCategory = require("../models/DishCategory");
const { Dish, DishItem, DishComment } = require("../models/Dish");
const Food = require("../models/Food");
const FoodCategory = require("../models/FoodCategory");
const { Op } = require("sequelize");
const User = require("../models/User");
const FavoriteFood = require("../models/FavoriteFood");

exports.getUserDishes = async (req, res) => {
  try {
    const result = await Dish.findAll({
      where: { user_id: req.params.userId },
      attributes: {
        exclude: ["user_id", "category_id"],
      },
      include: [
        { model: DishCategory },
        {
          model: DishItem,
          attributes: {
            exclude: ["dish_id", "favorite_food_id"],
          },
          include: {
            model: FavoriteFood,
            attributes: {
              exclude: ["user_id"],
            },
            include: {
              model: Food,
              attributes: {
                exclude: ["category_id"],
              },
              include: FoodCategory,
            },
          },
        },
        {
          model: DishComment,
          attributes: {
            exclude: ["dish_id", "user_id"],
          },
          include: {
            model: User,
            attributes: [
              "name",
              "username",
              "type",
              "profile_picture",
              "user_id",
            ],
          },
        },
      ],
    });

    if (result.length > 0) {
      const dishes = result.map((dish) => {
        const carbohydrates = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.carbohydrates * item.amount) / 100,
          0
        );
        const protein = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.protein * item.amount) / 100,
          0
        );
        const kcal = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.kcal * item.amount) / 100,
          0
        );
        const saturated = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.saturated * item.amount) / 100,
          0
        );
        const monounsaturated = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.monounsaturated * item.amount) / 100,
          0
        );
        const polyunsaturated = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.polyunsaturated * item.amount) / 100,
          0
        );
        const sodium = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.sodium * item.amount) / 100,
          0
        );
        const iron = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.iron * item.amount) / 100,
          0
        );
        const vitaminC = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.vitaminC * item.amount) / 100,
          0
        );
        const calcium = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.calcium * item.amount) / 100,
          0
        );
        const potassium = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.potassium * item.amount) / 100,
          0
        );
        const magnesium = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.magnesium * item.amount) / 100,
          0
        );
        const zinc = dish.DishItems.reduce(
          (acc, item) =>
            acc + (item.FavoriteFood.Food.zinc * item.amount) / 100,
          0
        );
        dish.vitaminC = vitaminC.toFixed(1);
        dish.carbohydrates = carbohydrates.toFixed(1);
        dish.protein = protein.toFixed(1);
        dish.kcal = kcal.toFixed(1);
        dish.saturated = saturated.toFixed(1);
        dish.monounsaturated = monounsaturated.toFixed(1);
        dish.polyunsaturated = polyunsaturated.toFixed(1);
        dish.sodium = sodium.toFixed(1);
        dish.iron = iron.toFixed(1);
        dish.calcium = calcium.toFixed(1);
        dish.potassium = potassium.toFixed(1);
        dish.magnesium = magnesium.toFixed(1);
        dish.zinc = zinc.toFixed(1);
        return dish;
      });

      return res.status(200).json({
        status: "success",
        length: result.length,
        result: dishes,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        errorCode: 404,
        message: "Nenhum prato encontrado!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createDish = async (req, res) => {
  try {
    const dish = await Dish.create({
      name: req.body.name,
      category_id: req.body.category_id,
      user_id: req.body.user_id,
    });

    const arr = [
      ...req.body.foods.map((food) => {
        return {
          amount: food.amount,
          favorite_food_id: food.favorite_food_id,
          dish_id: dish.dish_id,
        };
      }),
    ];

    const dishItems = await DishItem.bulkCreate([...arr]);
    return res.status(201).json({
      status: "success",
      result: dish,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateDish = async (req, res) => {
  try {
    const promises = [];

    const dishItems = await DishItem.findAll({
      where: { dish_id: req.params.dishId },
    });

    req.body.foods.forEach(async (food) => {
      const matchingDishItem = dishItems.find(
        (dishItem) => dishItem.favorite_food_id === food.favorite_food_id
      );
      if (matchingDishItem) {
        if (matchingDishItem.amount !== food.amount) {
          matchingDishItem.amount = food.amount;
          promises.push(await matchingDishItem.save());
        }
      } else {
        promises.push(
          await DishItem.create({
            favorite_food_id: food.favorite_food_id,
            amount: food.amount,
            dish_id: req.params.dishId,
          })
        );
      }
    });

    dishItems.forEach(async (dishItem) => {
      const matchingFood = req.body.foods.find(
        (food) => food.favorite_food_id === dishItem.favorite_food_id
      );
      if (!matchingFood) promises.push(await dishItem.destroy());
    });

    await Promise.all(promises);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.dishId);
    await dish.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.commentDish = async (req, res) => {
  try {
    const result = await DishComment.create({
      dish_id: req.params.dishId,
      user_id: req.body.user_id,
      text: req.body.text,
    });
    return res.status(201).json({
      status: "success",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({});
  }
};

exports.deleteDishComment = async (req, res) => {
  try {
    const result = await DishComment.destroy({
      where: {
        [Op.and]: [
          { dish_id: req.params.dishId },
          { comment_id: req.params.commentId },
        ],
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};
