const { sequelize } = require("./db");
const { Kitten, User } = require("./");
const { kittens, users } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  const usersCreated = await User.bulkCreate(users);
  await Promise.all(
    kittens.map(async (kitten, i) => {
      const userNumber = Math.ceil(Math.random() * 3);
      let newUser = await User.findByPk(userNumber);
      await newUser[userNumber].addKitten(kitten);
    })
  );
};

module.exports = seed;
