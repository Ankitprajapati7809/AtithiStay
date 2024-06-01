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
    origin: ["https://atithistay.vercel.app"],
    credentials: true,
  })
);    

app.use("/", listingRoutes); 
app.use("/search", searchRoutes);
app.use("/", userRoutes);
app.use("/", reviewRoutes);

app.get("/verify/checkauth", (req, res)=>{
  const token = req.cookies.authToken;
  // console.log(token)
  res.send(token);
})   
 
// app.use(("*"), (req, resp,next)=>{
//   resp.send("page not found")
// })

// app.use((err,req,resp,next)=>{
//   let{statusCode=500,message="Somthing went wrong!"}=err;
//   resp.status(statusCode).send("error.ejs",{message} );
// });

app.listen(5000, function () {
  console.log("Server is running on port 5000...");
}); 
  