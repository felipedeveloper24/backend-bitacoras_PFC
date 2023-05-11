
const express = require("express");
const app = express()

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

prisma.

app.use(express.json())

app.listen(3000,()=>{
    console.log("El servidor está escuchando en el puerto 3000")
})