const { Sequelize, sequelize } = require("../db/db");

const Kitten = sequelize.define("kitten", {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  age: Sequelize.INTEGER,
  ownerId: Sequelize.INTEGER,
});

module.exports = { Kitten };
