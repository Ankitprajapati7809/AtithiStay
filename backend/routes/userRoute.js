const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);

router.post(
  "/login", userController.loginUser
);

router.get("/logout", (req, resp, next) => {
  // console.log(req);

  req.logout((err) => {
    if (err) {
     return next(err);
    }
    console.log("you logged out! ");
    // resp.send("succesfully logout!")
  });
  // console.log(req.user);

});

module.exports = router;
