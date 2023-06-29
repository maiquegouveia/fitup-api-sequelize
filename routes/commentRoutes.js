const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router
  .route("/")
  .post(commentController.createComment)
  .get(commentController.getComments);

module.exports = router;
