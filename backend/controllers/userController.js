require('dotenv').config();

const User = require("../model/userSchema.js");
const bcrypt = require("bcrypt"); 
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword, 
    });

    const savedUser = await newUser.save();

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(402).json({ error: "Invalid email or password" });
    }
  const token = jwt.sign(
    {userId: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "20d",
    }
  );
  res.cookie("authToken", token, {
    maxAge: 20 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    // sameSite: "strict",
  });
    return res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      // Duplicate key error
      return res
        .status(409)
        .json({ error: "Username or email already exists" });
    }
    return res.status(500).json({ error: "Internal server error" }); // General error handling
  }
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(402).json({ error: "Invalid password." });
  }

  // Create a JWT token with the user's ID and a secret key
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "20d",
    }
  );
  res.cookie("authToken", token, {
    maxAge: 20 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    // sameSite: "strict",
  });

  res.json("Login successfull");
};
 