const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const nodemailer = require("../nodemailer");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.DOUBLE,
    },
    weight: {
      type: DataTypes.DOUBLE,
    },
    profile_picture: {
      type: DataTypes.STRING,
      defaultValue: "https://i.ibb.co/tJBC4C4/default-profile.png",
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "User",
  }
);

User.afterCreate(async (user, options) => {
  const username = `${user.name.replaceAll(" ", "").toLowerCase()}#${
    user.user_id
  }`;
  user.username = username;
  await user.save();
  nodemailer.emailSenderWelcomeMessage(user.email, user.name);
});

module.exports = User;
