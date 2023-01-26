const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SIGNING_SECRET } = process.env;

exports.setUser = (req, res, next) => {
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

exports.requiresAuth = async (req, res, next) => {
  try {
    if (req.params.id && req.params.id != req.user.id) {
      return res.status(401).send("Unauthorized");
    }
    if (req.user) return next();
    res.status(401).send("Unauthorized");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
