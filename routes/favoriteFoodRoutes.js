const express = require("express");
const favoriteFoodController = require("../controllers/favoriteFoodController");

const router = express.Router();

router
  .route("/userId/:userId")
  .get(favoriteFoodController.getUserFavoritesFood);
router
  .route("/userId/:userId/food/:foodId")
  .post(favoriteFoodController.favoriteFood)
  .delete(favoriteFoodController.removeFavoriteFood);

module.exports = router;
