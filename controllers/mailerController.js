const nodeMailer = require("../nodemailer");

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
  const result = await nodeMailer.emailSenderAccountRecovery(req.body);
  if (!result?.error) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
};
