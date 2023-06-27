const User = require("../models/User");
const bcrypt = require("../bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.encrypt(req.body.password),
      height: req.body.height,
      weight: req.body.weight,
      profile_picture: req.body.profile_picture,
      phone: req.body.phone,
      type: req.body.type,
      username: "",
    });

    user.password = req.body.password;
    return res.status(201).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json({
      status: "success",
      length: allUsers.length,
      results: allUsers,
    });
  } catch (error) {
    return res.sendStatus(500).json(error);
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email, password } = req.params;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    const result = bcrypt.decrypt(user.password, password);
    if (result) {
      user.password = password;
      return res.status(200).json({
        status: "success",
        result: user,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        errorCode: 404,
        message: "Email ou senha inválido!",
      });
    }
  } else {
    return res.status(404).json({
      status: "fail",
      errorCode: 404,
      message: "Email ou senha inválido!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Usuário não encontrado!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      },
    });
    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "Email já cadastrado!",
      });
    } else {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
