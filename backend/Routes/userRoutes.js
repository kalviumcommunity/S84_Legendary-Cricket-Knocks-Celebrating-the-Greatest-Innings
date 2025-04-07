const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in fetching data" });
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, userName, age } = req.body;
  if (!firstName || !lastName || !email || !userName || !age) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    const newUser = new User({ firstName, lastName, email, userName, age });
    await newUser.save();
    res.status(201).json({ message: "New user saved", user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in posting data" });
  }
});

module.exports = router;