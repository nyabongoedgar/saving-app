const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.status(403).json({
        message: err.message || "jwt expired",
        type: err.name || "TokenExpiredError",
      });
    }
    req.userId = user._id;
    next(); // pass the execution off to whatever request the client intended
  });
};
