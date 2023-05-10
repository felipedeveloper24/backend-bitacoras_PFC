
const express = require("express");
const app = express()

app.use(express.json())

app.listen(3000,()=>{
    console.log("El servidor está escuchando en el puerto 3000")
})