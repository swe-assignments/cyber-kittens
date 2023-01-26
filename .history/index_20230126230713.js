const express = require("express");
const app = express();
require("dotenv").config();

const { setUser, requiresAuth } = require("./middleware");
const { register } = require("./routes/register");
const { login } = require("./routes/login");

const { SIGNING_SECRET } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

app.use(setUser);

app.get("/", async (req, res, next) => {
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

app.post("/register", register);

app.post("/login", login);

app.use("/kittens", requiresAuth, require("./routes/kittens"));

// GET /kittens/:id
// TODO - takes an id and returns the cat with that id
// app.get("/kittens/:id", requiresAuth, async (req, res, next) => {
//   const { id } = req.params;
//   console.log(id);
//   const { ownerId, age, color, name } = await Kitten.findByPk(id);
//   if (!ownerId) {
//     res.status(404).send("Resource not found");
//   }
//   if (ownerId != req.user.id) {
//     res.status(401).send("Unauthorized");
//     return;
//   }
//   res.send({ age, color, name });
// });

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
