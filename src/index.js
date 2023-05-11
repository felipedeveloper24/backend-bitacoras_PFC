
const express = require("express");
const app = express()

require("dotenv").config({
    path:"./.env"
})

app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
})