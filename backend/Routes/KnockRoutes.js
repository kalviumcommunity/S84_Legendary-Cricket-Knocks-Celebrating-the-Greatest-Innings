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

router.put("/:id", async (req, res) => {
  try {
    const { playerName, runs, balls, country, opponent } = req.body;
    const knockId = req.params.id;
    const updatedKnock = await Knock.findByIdAndUpdate(
      knockId,
      { playerName, runs, balls, country, opponent },
      { new: true }
    );
    if (!updatedKnock) {
      return res.status(404).json({ success: false, message: "Knock not found" });
    }
    res.status(200).json({
      success: true,
      message: "Knock updated successfully",
      knock: updatedKnock,
    });
  } catch (error) {
    console.error("Error updating knock:", error);
    res.status(500).json({ success: false, message: "Failed to update knock" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const knockId = req.params.id;
    const deletedKnock = await Knock.findByIdAndDelete(knockId);
    if (!deletedKnock) {
      return res.status(404).json({ success: false, message: "Knock not found" });
    }
    res.status(200).json({ success: true, message: "Knock deleted successfully" });
  } catch (error) {
    console.error("Error deleting knock:", error);
    res.status(500).json({ success: false, message: "Failed to delete knock" });
  }
});

module.exports = router;