const { sequelize } = require("./db");
const { Kitten, User } = require("./");
const { kittens, users } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  const usersCreated = await User.bulkCreate(users);
  console.log(usersCreated);
  await Kitten.bulkCreate(kittens);
};

module.exports = seed;
