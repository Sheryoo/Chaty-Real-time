const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");
const User = require("./User");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
    },
    reciever: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
    },
  },
  { sequelize, modelName: "message" }
);
module.exports = Message;