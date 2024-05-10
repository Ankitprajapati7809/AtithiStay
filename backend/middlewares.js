const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgh56774sdfg";

module.exports.authenticateJWT = (req, res, next) => {
  // console.log (req.cookies.authToken);
  const token = req.cookies.authToken;

  if (!token) {
    return res.send("Unauthorized. No token provided.");
  }

  try {
    // console.log("Aa gya bhi")
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token with the secret key
    req.user = decoded; // Set the user data on the request object
    // res.status(200).json(req.user);
    next();
    
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};
