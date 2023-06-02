
const express = require("express");
const app = express()

require("dotenv").config({
    path:"./.env"
})


app.use(express.json())
const cors = require("cors");
app.use(cors({
    origin:"http://localhost:5173"
}))

const routesEmpresa = require("./routes/routesEmpresa");
const routesOferta = require("./routes/routesOferta");
const routerInscripcion = require("./routes/routesInscripcion");
const routerBitacoraAlumno = require("./routes/routesBitacoraAlumno");
const routerArchivoBitacoraAlumno = require("./routes/routesArchivoBitacoraAlumno");
const routerArchivoInscripcion = require("./routes/routesArchivoInscripcion");
const routerAvisos  = require("./routes/routesAvisos");
const routerAuth = require("./routes/routesAuth");
const routerLogin = require("./routes/LoginRoutes");
app.use("/api/empresa",routesEmpresa);
app.use("/api/oferta",routesOferta);
app.use("/api/inscripcion",routerInscripcion);
app.use("/api/bitacoralumno",routerBitacoraAlumno);
app.use("/api/archivoalumno",routerArchivoBitacoraAlumno);
app.use("/api/archivoinscripcion",routerArchivoInscripcion);
app.use("/api/aviso",routerAvisos);
app.use("/api/auth",routerAuth);
app.use("/api/auth",routerLogin);


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

