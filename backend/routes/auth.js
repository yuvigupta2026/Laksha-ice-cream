const express = require("express");
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* 🔍 Test route */
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working ✅" });
});

/* 🔐 LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

=======
const router = express.Router();
const User = require("../models/User"); // Ensure you have a User model in models/User.js

// 🍦 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🍦 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
>>>>>>> 4c625a154febd4e759166517e40fb718b04ff8f2
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful!", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a user by email
router.delete("/delete-user/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // This MUST be here
