const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
//this is JWT 
//sir call kr simple