const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  host: "./database.sqlite",
});

module.exports = sequelize;
