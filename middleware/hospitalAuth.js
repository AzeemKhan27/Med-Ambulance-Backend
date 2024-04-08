const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({status:false,statusCode:401,message:"Access Denied"});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_HOSPITAL);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
