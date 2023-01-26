const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      res.send("Username already taken.");
      return;
    }
    const hashedPW = await bcrypt.hash(password, 8);
    const { id } = await User.create({ username, password: hashedPW });
    const token = jwt.sign({ id, username }, SIGNING_SECRET);
    res.send({ message: "User successfully created", token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
