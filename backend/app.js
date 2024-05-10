const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");       
const cookieParser = require("cookie-parser"); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sdfgh56774sdfg"
const userRoutes = require("./routes/userRoute.js")
const listingRoutes = require("./routes/listingRoute.js")
const searchRoutes = require("./routes/searchRoute.js")       
  
app.use(cookieParser()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);  

app.use("/listing", listingRoutes);
app.use("/search", searchRoutes);
app.use("/", userRoutes);


// app.get("/checkauth", (req, res, next)=>{
//   console.log("..........................")
//   const token = req.cookies.authToken;
//   if (!token) {
//     return res.status(403).json({ error: "Unauthorized. No token provided." });
//   }
//   try {
//     console.log("Aa gya bhi");
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; 
//     res.status(200).send(req.user);
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized. Invalid token." });
//   } 
// })  






app.listen(5000, function () {
  console.log("Server is running on port 5000...");
}); 
 