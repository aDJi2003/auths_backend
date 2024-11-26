const express = require("express");
const Artist = require("../models/Artist");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
});

router.post("/", async (req, res) => {
  const { image, name } = req.body;

  if (!image || !name) {
    return res.status(400).json({ message: "Image and name are required" });
  }

  try {
    const newArtist = new Artist({ image, name });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).json({ message: "Error creating artist", error });
  }
});

module.exports = router;
