const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { id, password: hashedPW } = await User.findOne({
      where: { username },
    });

    if (id) {
      const isMatch = await bcrypt.compare(password, hashedPW);
      if (isMatch) {
        const token = jwt.sign({ id, username }, process.env.SIGNING_SECRET);
        res.send({ message: "success", token });
        return;
      }
    }
    res.status(401).send("Unauthorized");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
