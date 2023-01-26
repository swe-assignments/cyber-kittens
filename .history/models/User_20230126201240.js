const { Sequelize, sequelize } = require("../db/db");

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

exports = { User };
