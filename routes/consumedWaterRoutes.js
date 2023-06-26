const express = require("express");
const consumedWaterController = require("../controllers/consumedWaterController");

const router = express.Router();

router
  .route("/userId/:userId")
  .get(consumedWaterController.getUserWaterConsume);

router
  .route("/userId/:userId/amount/:amount")
  .post(consumedWaterController.consumeWater);

module.exports = router;
