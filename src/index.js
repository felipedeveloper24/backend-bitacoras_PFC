
const express = require("express");
const app = express()

require("dotenv").config({
    path:"./.env"
})


console.log("Este es un cambio de felipe");

console.log('Console log de Jorge Millar')
app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
})

