const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { email, text } = req.body;

    const comment = await Comment.create({
      email: email,
      text: text,
    });

    return res.status(201).json({
      status: "success",
      result: comment,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(200).json({
      status: "success",
      result: comments,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
