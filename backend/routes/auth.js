const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hashed });
  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);
  res.json({ message: match ? "Login success" : "Wrong password" });
});

module.exports = router;
