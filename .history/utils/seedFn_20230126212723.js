const bcrypt = require("bcrypt");
const { sequelize } = require("../db/db");
const { Kitten, User } = require("../models");
const { kittens, users } = require("./seedData");

exports.seed = async () => {
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
