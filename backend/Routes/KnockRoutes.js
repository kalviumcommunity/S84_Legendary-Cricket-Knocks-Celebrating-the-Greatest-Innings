const express = require("express");
const router = express.Router();
const Knock = require("../Models/KnockModel");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const knocks = await Knock.find();
    res.status(200).json(knocks);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching data",
    });
  }
});

// POST route (unchanged, for completeness)
router.post("/", async (req, res) => {
  const { playerName, runs, balls, country, opponent } = req.body;
  if (!playerName || !runs || !balls || !country || !opponent) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    const newKnock = new Knock({ playerName, runs, balls, country, opponent });
    await newKnock.save();
    res.status(201).json({ success: true, message: "New knock saved", knock: newKnock });
  } catch (error) {
    console.error("Error saving knock:", error);
    res.status(500).json({ success: false, message: "Error in posting data" });
  }
});

module.exports = router;