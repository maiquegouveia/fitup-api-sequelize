const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.createUser).get(userController.getUsers);
router
  .route("/email/:email/password/:password")
  .get(userController.getUserByEmail);

module.exports = router;
