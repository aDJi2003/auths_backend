const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors({
    origin: "https://front-end-paw.vercel.app",
    methods: ["GET", "POST"],                
    allowedHeaders: ["Content-Type"],         
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);

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
