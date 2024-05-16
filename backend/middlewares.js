const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgh56774sdfg";

module.exports.authenticateJWT = (req, res, next) => {
  console.log("..............")
  console.log (req.cookies.authToken);
  console.log("------------------")
  const token = req.cookies.authToken; 

  if (!token) {
    return res.status(403).json("Unauthorized. No token provided.");
  } 

  try {
    // console.log("Aa gya bhi")
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token with the secret key
    req.user = decoded; // Set the user data on the request object
    // console.log(req.user)
    // res.status(200).json(req.user);
    next();
     
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
}; 
