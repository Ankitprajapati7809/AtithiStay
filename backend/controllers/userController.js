const User = require("../model/userSchema.js");
const bcrypt = require("bcrypt"); // To hash passwords
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgh56774sdfg";

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword, // Store hashed password
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
      // Create a JWT token with the user's ID and a secret key
  const token = jwt.sign(
    {userId: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
  res.cookie("authToken", token, {
    maxAge: 1800000,
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
    return res.status(402).json({ error: "password" });
  }

  // Create a JWT token with the user's ID and a secret key
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
  res.cookie("authToken", token, {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    // sameSite: "strict",
  });

  res.json("Login successfull");
};
