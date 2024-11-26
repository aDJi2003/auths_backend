const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

// Create a new song
router.post("/", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).send({ data: song, message: "Song successfully created!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch songs", error: error.message });
  }
});

// Get a song by ID
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({ message: "Song not found" });
    res.status(200).send({ data: song });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch song", error: error.message });
  }
});

// Update a song by ID
router.put("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).send({ message: "Song not found" });
    res.status(200).send({ data: song, message: "Song successfully updated!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to update song", error: error.message });
  }
});

// Delete a song by ID
router.delete("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).send({ message: "Song not found" });
    res.status(200).send({ message: "Song successfully deleted!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete song", error: error.message });
  }
});

module.exports = router;
