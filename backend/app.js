const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");       
const cookieParser = require("cookie-parser"); 
const userRoutes = require("./routes/userRoute.js")
const listingRoutes = require("./routes/listingRoute.js")
const searchRoutes = require("./routes/searchRoute.js")       
const reviewRoutes = require("./routes/reviewRoute.js")  
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
app.use("/", reviewRoutes);

app.get("/checkauth", (req, res)=>{
  console.log(".............56............")
  const token = req.cookies.authToken;
  console.log(token)
  res.send(token);
})   

app.all("*", (req, resp)=>{
  resp.send("page not found")
})


app.listen(5000, function () {
  console.log("Server is running on port 5000...");
}); 
  