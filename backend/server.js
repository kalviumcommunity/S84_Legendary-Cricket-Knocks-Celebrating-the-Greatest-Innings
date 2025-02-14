const express = require('express')
const app = express()
const PORT = 8080

app.get('/', (req,res)=>{
    res.send('This is Home Route')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})