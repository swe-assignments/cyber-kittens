const { sequelize } = require("../db/db");
const seed = require("../db./utils/seedFn");

seed()
  .then(() => {
    console.log("Seeding success. Laughs on!");
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
