const home = require("./home");
const kittens = require("./kittens");
const register = require("./register");
const login = require("./login");

console.log(home, register, login, kittens);

exports = { home, kittens, register, login };
