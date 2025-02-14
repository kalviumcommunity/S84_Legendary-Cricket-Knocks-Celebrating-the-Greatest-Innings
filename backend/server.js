const express = require("express");
const app = express();

const PORT = 8080;

app.get("/ping", (req, res) => {
    res.send("This is Home Route");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})