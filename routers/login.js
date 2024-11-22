const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const config = require("config");
const rateLimit = require("express-rate-limit");

//terminating the process if the towken is not set
if (!config.get("jwtsec")) {
  console.log("FATAL ERROR: jwtsec is not defined");
  process.exit(1);
}
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message: "Too many login attempts. Please try again later.",
  });
//Login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password." });
    }
    const token = user.genAuthToken({ expiresIn: "1h"});
   
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        code: user.code,
        name: user.name,
        email: user.email,
        skills: user.skills,
        posts: user.posts,
        role: user.userRole,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
