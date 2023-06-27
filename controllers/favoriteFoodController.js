const { Op } = require("sequelize");
const FavoriteFood = require("../models/FavoriteFood");
const Food = require("../models/Food");
const FoodCategory = require("../models/FoodCategory");

exports.getUserFavoritesFood = async (req, res) => {
  try {
    const result = await FavoriteFood.findAll({
      where: { user_id: req.params.userId },
      attributes: {
        exclude: ["food_id", "user_id"],
      },
      include: {
        model: Food,
        include: {
          model: FoodCategory,
        },
      },
    });

    return res.status(200).json({
      status: "success",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.favoriteFood = async (req, res) => {
  try {
    const result = await FavoriteFood.create({
      user_id: +req.params.userId,
      food_id: +req.params.foodId,
    });
    return res.status(201).json({
      status: "success",
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.removeFavoriteFood = async (req, res) => {
  try {
    const favoriteFood = await FavoriteFood.findOne({
      where: { favorite_food_id: req.params.favoriteFoodId },
    });
    await favoriteFood.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};
