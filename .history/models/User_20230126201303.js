const { Sequelize, sequelize } = require("../db/db");

exports.User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});
