
const express = require("express");
const app = express()

require("dotenv").config({
    path:"./.env"
})

const routerAptitud = require('./routes/aptitudesRoutes');
const routerRepresentante = require('./routes/representanteRoutes');
const routerConocimiento  = require('./routes/conocimientoRoutes');
const routerArchivoJefe = require('./routes/archivo_jefeRoutes');
const routerBitacoraJefe = require('./routes/bitacora_jefeRoutes')
app.use(express.json())
app.use('/api/aptitud', routerAptitud);
app.use('/api/representante', routerRepresentante);
app.use('/api/conocimiento', routerConocimiento)
app.use('/api/archivojefe/', routerArchivoJefe)
app.use('/api/bitacorajefe/', routerBitacoraJefe)
app.listen(process.env.PORT,()=>{
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
})