const nodeMailer = require("../nodemailer");
const User = require("../models/User");

exports.sendConfirmationCode = async (req, res) => {
  const { email, codeClient } = req.body;
  const result = await nodeMailer.emailSenderAccountConfirmation(
    email,
    codeClient
  );
  if (!result?.error) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
};

exports.sendRecoveryCode = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const data = {
    email: req.body.email,
    verificationCode: req.body.verificationCode,
    name: user.name,
  };
  const result = await nodeMailer.emailSenderAccountRecovery(data);
  if (!result?.error) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
};
