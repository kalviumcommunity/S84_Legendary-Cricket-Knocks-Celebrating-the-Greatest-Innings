const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = process.env.DB_URI;

app.use(express.json());

const connectToDb = require('./src/config/db');
const router = require("./Routes/routes");

app.get("/ping", (req, res) => {
  try {
    res.status(200).send("This is Home Route");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api", router);

app.listen(PORT, async () => {
  try {
    
    await connectToDb(db);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Connected to database')
  } catch (error) {
    console.error('Failed to start server:', error);
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

