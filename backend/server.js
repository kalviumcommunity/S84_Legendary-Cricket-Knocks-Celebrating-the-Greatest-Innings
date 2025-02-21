const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectToDb = require("./src/Config/db");

app.get("/ping", (req, res) => {
  try {
    res.status(200).send("This is Home Route");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const db = process.env.DB_URI;


app.listen(PORT, async () => {
  try {
    await connectToDb(db);
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});