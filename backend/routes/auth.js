const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // 🔐 Create token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "laksha_secret",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login success",
    token
  });
});

module.exports = router;
