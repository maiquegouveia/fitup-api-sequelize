const express = require("express");
const foodController = require("../controllers/foodController");

const router = express.Router();

router.route("/").get(foodController.getAllFoods);
router.route("/foodName/:foodName").get(foodController.getFoodByName);
router
  .route("/topCarbohydrate/:limit")
  .get(foodController.getTopCarbohydrateFoods);
router.route("/topProtein/:limit").get(foodController.getTopProteinFoods);
router.route("/topKcal/:limit").get(foodController.getTopKcalFoods);

module.exports = router;
