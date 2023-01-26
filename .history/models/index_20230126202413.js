const { Kitten } = require("./Kitten");
const { User } = require("./User");
const { sequelize, Sequelize } = require("../db/db");

User.hasMany(Kitten, { foreignKey: "ownerId" });
Kitten.belongsTo(User, { foreignKey: "ownerId" }); // Kitten table, there will be an ownerId <- FK
console.log("model:index", User);
module.exports = {
  Kitten,
  User,
  sequelize,
  Sequelize,
};
