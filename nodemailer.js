require("dotenv").config({ path: "./config.env" });

const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  service: process.env.NODE_MAILER_SERVICE,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
});

exports.emailSenderAccountConfirmation = async (email, codeClient) => {
  let error;
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject: "Código de Confirmação da Conta",
    html: `
    <h1>Confirmação de Conta</h1>
    <p>Obrigado pela preferência.</p>
    <p>Utilize o seguinte código de confirmação para verificar a sua conta:</p>
    <h2>Código de Confirmação: ${codeClient}</h2>
    <p>Se tiver alguma dúvida, sinta-se à vontade para entrar em contato conosco.</p>
    <p>Atenciosamente,</p>
    <p>A equipe do FitUP</p>
  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      error = {
        error: err,
      };
      console.log(err);
    } else {
      console.log(`Email sent: ${info.messageId}`);
    }
  });
  return error;
};

exports.emailSenderWelcomeMessage = async (email, name) => {
  let error;
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject: "Bem-vindo(a) ao FitUP!",
    html: `
    <h1>Olá, ${name}!</h1>
    <h2>Bem-vindo(a) ao FitUP!</h2>
    <p>Obrigado por criar uma conta.</p>
    <p>Estamos felizes em tê-lo(a) conosco!</p>
    <p>Se você tiver alguma dúvida, sinta-se à vontade para entrar em contato conosco.</p>
    <p>Atenciosamente,</p>
    <p>A equipe do FitUP</p>
  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      error = {
        error: err,
      };
      console.log(err);
    } else {
      console.log(`Email sent: ${info.messageId}`);
    }
  });
  return error;
};