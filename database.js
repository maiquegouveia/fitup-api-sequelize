const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize({
  host: config.production.host,
  database: config.production.database,
  dialect: config.production.dialect,
  username: config.production.username,
  password: config.production.password,
  logging: false,
  dialectModule: require("mysql2"),
});

sequelize.authenticate();
module.exports = sequelize;
