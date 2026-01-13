const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// TEST ROUTE (IMPORTANT)
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working ✅" });
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "laksha_secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login success",
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error"
