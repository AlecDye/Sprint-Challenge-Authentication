const jwt = require("jsonwebtoken");
const secrets = require("../api/secrets.js");

module.exports = (req, res, next) => {
  // Postman -> { authorization: `token string` }
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;
  // Decoding the submitted token for the correct user
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      // if something went wrong verifying the token (they don't match) throw an error
      if (error) {
        res.status(401).json({ you: "Access Denied!" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please provide user credentials" });
  }
};
