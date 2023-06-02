
const express = require("express")
const routerArchivoInscripcion =  express.Router();
const archivoInscripcionController = require("../controllers/archivoInscripcionController");
const { body, param } = require("express-validator");

const multer = require("multer");

const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");
const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionToken} = require("../middlewares/verifyToken");
const upload = multer({
    storage: multer.memoryStorage()
})

routerArchivoInscripcion.post("/create",
[
    AutenticacionAlumno,
    upload.single("archivo"),
    body("tipo_archivo").notEmpty().withMessage("El campo tipo_archivo es requerido").isInt().withMessage("El campo tipo_archivo debe ser entero"),
    body("id_inscripcion").notEmpty().withMessage("El campo id_inscripcion es requerido").isInt().withMessage("El campo id_inscripcion debe ser entero")   
],
archivoInscripcionController.subirArchivo)

routerArchivoInscripcion.get("/getall/:id",
[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")
]
,archivoInscripcionController.mostrar_archivos)

routerArchivoInscripcion.delete("/delete/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")  
]
,archivoInscripcionController.eliminar_archivo);


module.exports = routerArchivoInscripcion;