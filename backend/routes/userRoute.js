const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);

router.post(
  "/login", userController.loginUser
);

router.get("/logout", (req, resp) => {
    resp.clearCookie("authToken")
 return resp.send("succesfully logout!")

});

module.exports = router;
