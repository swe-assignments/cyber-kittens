const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { User } = require("./db");

const { SIGNING_SECRET } = process.env;

const setUser = (req, res, next) => {
  console.log(req.headers);
  try {
    const auth = req.header("Authorization");
    if (!auth) {
      next();
      return;
    }
    const [, token] = auth.split(" "); // "Bearer s8u923f09sdf230fhsd32"
    const user = jwt.verify(token, SIGNING_SECRET);
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setUser);

app.get("/", async (req, res, next) => {
  console.log(req.user);
  try {
    res.send(`
      <h1>Welcome to Cyber Kittens!</h1>
      <p>Cats are available at <a href="/kittens/1">/kittens/:id</a></p>
      <p>Create a new cat at <b><code>POST /kittens</code></b> and delete one at <b><code>DELETE /kittens/:id</code></b></p>
      <p>Log in via POST /login or register via POST /register</p>
    `);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const { id } = await User.create({ username, password });
    const token = jwt.sign({ id, username }, SIGNING_SECRET);
    res.send({ message: "User successfully created", token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Verifies token with jwt.verify and sets req.user
// TODO - Create authentication middleware

// POST /register
// OPTIONAL - takes req.body of {username, password} and creates a new user with the hashed password

// POST /login
// OPTIONAL - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB

// GET /kittens/:id
// TODO - takes an id and returns the cat with that id
app.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, req.user.id);
    if (id == req.user.id) {
      const user = await User.findByPk(id);
      res.send(user);
      return;
    }
    res.status(403).send("You are not authorized.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /kittens
// TODO - takes req.body of {name, age, color} and creates a new cat with the given name, age, and color

// DELETE /kittens/:id
// TODO - takes an id and deletes the cat with that id

// error handling middleware, so failed tests receive them

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
