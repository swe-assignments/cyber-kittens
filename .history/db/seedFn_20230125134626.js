const { sequelize } = require("./db");
const { Kitten, User } = require("./");
const { kittens, users } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate(users);
  await Kitten.bulkCreate(kittens);
};

module.exports = seed;
