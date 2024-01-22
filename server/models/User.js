const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
