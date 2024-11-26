const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
