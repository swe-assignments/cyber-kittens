const { sequelize } = require("./db");
const { Kitten, User } = require("./");
const { kittens, users } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate(users);
  await Promise.all(
    kittens.map(async (kitten, i) => {
      const userNumber = Math.ceil(Math.random() * 3);
      let newUser = await User.findByPk(userNumber);

      let newKitten = await newUser.addKitten(kitten);
      if (i == 0) {
        console.log(newKitten);
      }
    })
  );
};

module.exports = seed;
