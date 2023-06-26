const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize({
  host: config.production.host,
  database: config.production.database,
  dialect: config.production.dialect,
  username: config.production.username,
  password: config.production.password,
  logging: false,
});

sequelize.authenticate();
module.exports = sequelize;
