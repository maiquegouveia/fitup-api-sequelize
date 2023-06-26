const express = require("express");
const dishController = require("../controllers/dishController");

const router = express.Router();

router.route("/").post(dishController.createDish);
router
  .route("/:dishId")
  .delete(dishController.deleteDish)
  .patch(dishController.updateDish);
router.route("/userId/:userId").get(dishController.getUserDishes);
router.route("/:dishId/comments").post(dishController.commentDish);
router
  .route("/:dishId/comments/:commentId")
  .delete(dishController.deleteDishComment);

module.exports = router;
