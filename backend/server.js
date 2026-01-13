require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());

/* ---------- MongoDB Connection ---------- */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ---------- Routes ---------- */
app.use("/api", require("./routes/auth"));

/* ---------- Health Check (VERY IMPORTANT) ---------- */
app.get("/", (req, res) => {
  res.send("Laksha Ice Cream Backend Running 🚀");
});

/* ---------- Port ---------- */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
