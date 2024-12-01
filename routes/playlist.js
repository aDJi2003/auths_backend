const express = require("express");
const router = express.Router();
const { PlayList} = require("../routes/playlist");
const { Song } = require("../routes/Song");
const { User } = require("../routes/user");

// Middleware for user authentication (dummy auth example)
const auth = async (req, res, next) => {
  try {
    // Simulate user ID extraction (replace with JWT or session-based auth)
    const userId = req.header("x-user-id"); // Replace with actual token-based auth
    if (!userId) return res.status(401).send({ message: "Access denied. No token provided." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found." });

    req.user = user; // Attach user object to the request
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid request." });
  }
};

/**
 * Create a Playlist
 */
router.post("/", auth, async (req, res) => {
  const { name, description, image } = req.body;
  if (!name) return res.status(400).send({ message: "Playlist name is required." });

  const playlist = new PlayList({ 
    name, 
    description: description || "", 
    image: image || "", 
    user: req.user._id,
    songs: [],
  });

  await playlist.save();

  // Update user's playlists
  req.user.playlists.push(playlist._id);
  await req.user.save();

  res.status(201).send({ message: "Playlist created successfully", data: playlist });
});

/**
 * Edit a Playlist by ID
 */
router.put("/edit/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  const playlist = await PlayList.findById(id);
  if (!playlist) return res.status(404).send({ message: "Playlist not found." });

  if (!playlist.user.equals(req.user._id))
    return res.status(403).send({ message: "You do not own this playlist." });

  if (name) playlist.name = name;
  if (description) playlist.description = description;
  if (image) playlist.image = image;

  await playlist.save();

  res.status(200).send({ message: "Playlist updated successfully", data: playlist });
});

/**
 * Add a Song to a Playlist
 */
router.put("/add-song", auth, async (req, res) => {
  const { playlistId, songId } = req.body;

  const playlist = await PlayList.findById(playlistId);
  if (!playlist) return res.status(404).send({ message: "Playlist not found." });

  if (!playlist.user.equals(req.user._id))
    return res.status(403).send({ message: "You do not own this playlist." });

  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
    await playlist.save();
  }

  res.status(200).send({ message: "Song added to playlist.", data: playlist });
});

/**
 * Remove a Song from a Playlist
 */
router.put("/remove-song", auth, async (req, res) => {
  const { playlistId, songId } = req.body;

  const playlist = await PlayList.findById(playlistId);
  if (!playlist) return res.status(404).send({ message: "Playlist not found." });

  if (!playlist.user.equals(req.user._id))
    return res.status(403).send({ message: "You do not own this playlist." });

  playlist.songs = playlist.songs.filter((id) => id !== songId);
  await playlist.save();

  res.status(200).send({ message: "Song removed from playlist.", data: playlist });
});

/**
 * Get All Playlists of the User
 */
router.get("/user", auth, async (req, res) => {
  const playlists = await PlayList.find({ user: req.user._id });
  res.status(200).send({ data: playlists });
});

/**
 * Get a Playlist by ID
 */
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  const playlist = await PlayList.findById(id).populate("songs");
  if (!playlist) return res.status(404).send({ message: "Playlist not found." });

  if (!playlist.user.equals(req.user._id))
    return res.status(403).send({ message: "You do not own this playlist." });

  res.status(200).send({ data: playlist });
});

/**
 * Delete a Playlist
 */
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  const playlist = await PlayList.findById(id);
  if (!playlist) return res.status(404).send({ message: "Playlist not found." });

  if (!playlist.user.equals(req.user._id))
    return res.status(403).send({ message: "You do not own this playlist." });

  await playlist.delete();

  // Update user's playlists
  req.user.playlists = req.user.playlists.filter((pid) => pid.toString() !== id);
  await req.user.save();

  res.status(200).send({ message: "Playlist deleted successfully." });
});

module.exports = router;
