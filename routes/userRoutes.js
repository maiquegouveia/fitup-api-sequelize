const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getUsers)
  .patch(userController.updateUser);
router.route("/authentication").post(userController.authenticateUser);
router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser);
router.route("/email/:email").get(userController.checkEmail);

module.exports = router;
