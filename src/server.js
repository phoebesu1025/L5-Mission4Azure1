const express = require('express');
const env = require("dotenv")
env.config()

const server = express()
server.use(express.json())

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log("listening to port", PORT)
})