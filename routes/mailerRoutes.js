const express = require("express");
const mailerController = require("../controllers/mailerController");
const router = express.Router();

router
  .route("/accountConfirmation")
  .post(mailerController.sendConfirmationCode);

module.exports = router;
