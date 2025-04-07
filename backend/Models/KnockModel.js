const { Schema, model } = require("mongoose");

const knockSchema = new Schema(
  {
    playerName: { type: String, required: true },
    runs: { type: Number, required: true },
    balls: { type: Number, required: true },
    country: { type: String, required: true },
    opponent: { type: String, required: true },
  },
  { timestamps: true }
);

const Knock = model("Knock", knockSchema);
module.exports = Knock;