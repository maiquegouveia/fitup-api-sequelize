const FoodCategory = require("../models/FoodCategory");

exports.createFoodCategory = async (req, res) => {
  try {
    const existingFoodCategory = await FoodCategory.findOne({
      where: { name: req.body.name },
    });
    if (existingFoodCategory) {
      return res.status(409).json({
        status: "fail",
        errorCode: 409,
        message: "Esta categoria já está cadastrada!",
      });
    }
    const result = await FoodCategory.create({
      name: req.body.name,
    });
    if (result) {
      return res.status(201).json({
        status: "success",
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getFoodCategories = async (req, res) => {
  try {
    const result = await FoodCategory.findAll();
    return res.status(200).json({
      status: "success",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteFoodCategoryByName = async (req, res) => {
  try {
    const result = await FoodCategory.destroy({
      where: { name: req.params.name },
    });
    if (result !== 0) {
      return res.status(204).json({
        status: "success",
        result: result,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        errorCode: 404,
        message: "Categoria não existe!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
