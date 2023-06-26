const DishCategory = require("../models/DishCategory");

exports.createDishCategory = async (req, res) => {
  try {
    const existingDishCategory = await DishCategory.findOne({
      where: { name: req.body.name },
    });
    if (existingDishCategory) {
      return res.status(409).json({
        status: "fail",
        errorCode: 409,
        message: "Esta categoria já está cadastrada!",
      });
    }
    const result = await DishCategory.create({
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

exports.getDishCategories = async (req, res) => {
  try {
    const result = await DishCategory.findAll();
    return res.status(200).json({
      status: "success",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteDishCategoryByName = async (req, res) => {
  try {
    const result = await DishCategory.destroy({
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
