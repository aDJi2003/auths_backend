const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

const songRoutes = require("./routes/Song");

dotenv.config();
const app = express();

app.use(cors({
  origin: ["https://front-end-paw.vercel.app", "http://localhost:5173"], // Tanpa trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"], // Pastikan ini adalah array
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' https://auth-backend.vercel.app"
    );
    next();
});

require('dotenv').config();

app.get("/", (req, res) => {
    res.send("API Find IT! 2024");
  });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
