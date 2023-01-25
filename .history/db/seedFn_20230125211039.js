const bcrypt = require("bcrypt");
const { sequelize } = require("./db");
const { Kitten, User } = require("./");
const { kittens, users } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Promise.all(
    users.map(async (user) => {
      const hashed = await bcrypt.hash(user.password, 6);
      user.password = hashed;
    })
  );
  await User.bulkCreate(users);
  await Kitten.bulkCreate(kittens);
  const cats = await Kitten.findAll({ where: { ownerId: 1 } });
  console.log(cats);
};

module.exports = seed;