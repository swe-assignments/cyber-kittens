const { Kitten } = require("./Kitten");
const { User } = require("./User");
const { sequelize, Sequelize } = require("./db");

User.hasMany(Kitten);
Kitten.belongsTo(User); // Kitten table, there will be an ownerId <- FK

module.exports = {
  Kitten,
  User,
  sequelize,
  Sequelize,
};
