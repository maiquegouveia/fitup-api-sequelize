const { Op } = require("sequelize");
const Food = require("../models/Food");
const FoodCategory = require("../models/FoodCategory");

exports.getFoodByName = async (req, res) => {
  try {
    const result = await Food.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.foodName}%`,
        },
      },
      attributes: {
        exclude: ["category_id"],
      },
      include: FoodCategory,
    });

    return res.status(200).json({
      status: "sucess",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllFoods = async (req, res) => {
  try {
    const result = await Food.findAll({
      attributes: {
        exclude: ["category_id"],
      },
      include: FoodCategory,
    });
    return res.status(200).json({
      status: "sucess",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getTopCarbohydrateFoods = async (req, res) => {
  try {
    const result = await Food.findAll({
      order: [["carbohydrates", "DESC"]],
      limit: +req.params.limit,
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

exports.getTopProteinFoods = async (req, res) => {
  try {
    const result = await Food.findAll({
      order: [["protein", "DESC"]],
      limit: +req.params.limit,
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

exports.getTopKcalFoods = async (req, res) => {
  try {
    const result = await Food.findAll({
      order: [["kcal", "DESC"]],
      limit: +req.params.limit,
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
