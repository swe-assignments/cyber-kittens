const { Kitten } = require("./Kitten");
const { User } = require("./User");
const { sequelize, Sequelize } = require("./db");

User.hasMany(Kitten, { through: "ownerId" });
Kitten.belongsTo(User, { foreignKey: "ownerId" }); // Kitten table, there will be an ownerId <- FK

module.exports = {
  Kitten,
  User,
  sequelize,
  Sequelize,
};