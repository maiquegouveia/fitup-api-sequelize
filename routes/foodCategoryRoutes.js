const express = require("express");
const foodCategoryController = require("../controllers/foodCategoryController");

const router = express.Router();

router
  .route("/")
  .get(foodCategoryController.getFoodCategories)
  .post(foodCategoryController.createFoodCategory);

router
  .route("/name/:name")
  .delete(foodCategoryController.deleteFoodCategoryByName);

module.exports = router;
