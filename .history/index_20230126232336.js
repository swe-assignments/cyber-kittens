const express = require("express");
const app = express();
require("dotenv").config();
const { setUser, requiresAuth } = require("./middleware");
const { SIGNING_SECRET } = process.env;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});
app.use(setUser);
//Router
app.use("/kittens", requiresAuth, require("./routes/kittens"));

//End-Points
app.get("/", require("./routes/home"));
app.post("/register", require("./routes/register"));
app.post("/login", require("./routes/login"));

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
