const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");
// Implement the register and login functionality inside /auth/auth-router.js. A user has username and password. Both properties are required.

router.post("/register", (req, res) => {
  let user = req.body;
  console.log("user", user);
  // Registration request needs both a "username" and "password"
  if (user.username && user.password) {
    // Encrypting password
    const rounds = process.env.HASH_ROUNDS || 10;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    // Sending request to auth database
    Users.add(user)
      .then((saved) => {
        console.log("then", saved);
        res.status(201).json({ saved, message: "User created successfully" });
      })
      .catch((error) =>
        res
          .status(500)
          .json({ errorMessage: "Unable to register new user", error })
      );
  } else {
    return res
      .status(400)
      .json({ message: "Please submit both a username and password " });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  // Login requires both "username" and "password"
  if (username && password) {
    Users.findBy({ username })
      .then(([user]) => {
        // Checking submitted password against password in database
        if (user && bcrypt.compareSync(password, user.password)) {
          // Success! -> create token to access protected routes
          const token = generateToken(user);
          res.status(200).json({ message: "User logged in, welcome!", token });
        } else {
          res.status(401).json({ message: "User not found, please register" });
        }
      })
      .catch((error) =>
        res.status(500).json({ errorMessage: "Unable to login user", error })
      );
  } else {
    return res
      .status(400)
      .json({ message: "Please submit both a username and password " });
  }
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
