const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SIGNING_SECRET } = process.env;

module.exports.setUser = (req, res, next) => {
  try {
    const auth = req.header("Authorization");
    if (!auth) {
      next();
      return;
    }
    const [, token] = auth.split(" "); // "Bearer s8u923f09sdf230fhsd32"
    const user = jwt.verify(token, SIGNING_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.requireAuth = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id == req.user.id) {
      next();
      return;
    }

    res.status(401).send("Unauthorized");
  } catch (error) {
    console.log(error);
    next(error);
  }
};