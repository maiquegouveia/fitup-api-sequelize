const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.createUser).get(userController.getUsers);
router
  .route("/email/:email/password/:password")
  .get(userController.getUserByEmail);
router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser);
router.route("/email/:email").get(userController.checkEmail);

module.exports = router;
