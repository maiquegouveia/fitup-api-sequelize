const { Op } = require("sequelize");
const ConsumedWater = require("../models/ConsumedWater");

exports.consumeWater = async (req, res) => {
  try {
    const result = await ConsumedWater.create({
      user_id: req.params.userId,
      amount: req.params.amount,
    });
    return res.status(201).json({
      status: "success",
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUserWaterConsume = async (req, res) => {
  try {
    const result = await ConsumedWater.findAll({
      where: { user_id: req.params.userId },
    });
    return res.status(200).json({
      status: "success",
      length: result.length,
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
