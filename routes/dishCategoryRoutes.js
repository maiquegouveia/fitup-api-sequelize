const express = require("express");
const dishCategoryController = require("../controllers/dishCategoryController");

const router = express.Router();

router
  .route("/")
  .get(dishCategoryController.getDishCategories)
  .post(dishCategoryController.createDishCategory);

router
  .route("/name/:name")
  .delete(dishCategoryController.deleteDishCategoryByName);

module.exports = router;
