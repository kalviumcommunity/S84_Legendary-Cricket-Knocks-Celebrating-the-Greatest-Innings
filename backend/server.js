const express = require('express')
const app = express()
PORT = 8080

app.get('/', (req,res)=>{
    res.send('This is Home Route')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})