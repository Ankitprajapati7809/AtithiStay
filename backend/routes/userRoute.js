const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/api/logout", (req, resp) => { 
    resp.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      })
 return resp.send("Logout succesfully! ")

});

module.exports = router;
