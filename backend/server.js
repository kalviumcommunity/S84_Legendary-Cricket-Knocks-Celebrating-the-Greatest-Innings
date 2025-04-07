const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./src/config/db");
const userRoutes = require("./Routes/userRoutes");
const knockRoutes = require("./Routes/KnockRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS from frontend (adjust if your frontend port differs)
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/knocks', knockRoutes);

app.get('/', (req, res) => {
  res.send('This is Home Route');
});

app.get("/ping", (req, res) => {
  res.status(200).send("You are inside Ping Route");
});

const DB_URI = process.env.DB_URI;

connectToDb(DB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to DB:', error);
  process.exit(1);
});