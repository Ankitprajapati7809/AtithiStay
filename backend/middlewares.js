require('dotenv').config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.authenticateJWT = (req, res, next) => {
  // console.log (req.cookies.authToken);
  const token = req.cookies.authToken; 

  if (!token) {
    return res.status(403).json("Unauthorized. No token provided.");
  } 

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = decoded; 
    // console.log(req.user)
    // res.status(200).json(req.user);
    next();
     
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
}; 
