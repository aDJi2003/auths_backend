const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
	name: { type: String, required: true },
	artist: { type: String, required: true },
	song: { type: String, required: true },
	img: { type: String, required: true },
	duration: { type: String, required: true },
	date: {type: String, required: true},
	album: {type: String, required:true},
	lyrics: {type: [String], default: []}
});

module.exports = mongoose.model("Song", SongSchema);