const mongoose = require("mongoose");

const KnockSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  runs: { type: Number, required: true },
  balls: { type: Number, required: true },
  country: { type: String, required: true },
  opponent: { type: String, required: true },
  videoUrl: { type: String }, // Optional video URL field
}, { timestamps: true });

module.exports = mongoose.model("Knock", KnockSchema);
