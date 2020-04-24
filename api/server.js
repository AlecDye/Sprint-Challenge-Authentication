const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const authenticate = require("../auth/authenticate-middleware.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  // console.log("HELP");
  res.send({ api: "live" });
});

module.exports = server;
