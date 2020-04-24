const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets.js");
// Implement the register and login functionality inside /auth/auth-router.js. A user has username and password. Both properties are required.

router.post("/register", (req, res) => {
  let user = req.body;
  // Registration request needs both a "username" and "password"
  if (user.username && user.password) {
    // Encrypting password
    const rounds = process.env.HASH_ROUNDS || 10;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    //todo user database with insert/add method followed by .then and .catch
  } else {
    return res
      .status(400)
      .json({ message: "Please submit both a username and password " });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

// Json web token
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
