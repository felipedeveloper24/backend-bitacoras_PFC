

const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})
const routerArchivoAlumno = express.Router()

const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionToken}  = require("../middlewares/verifyToken");

const archivoBitacoraAlumnoController = require("../controllers/archivoBitacoraAlumnoController");
const { body, param } = require("express-validator");

routerArchivoAlumno.post("/create",
[
    AutenticacionAlumno,
    upload.single("archivo"),
    body("tipo_archivo").notEmpty().withMessage("El campo tipo_archivo es requerido").isInt().withMessage("El campo tipo_archivo debe ser entero"),
    body("id_bitacora").notEmpty().withMessage("El campo id_bitacora es requerido").isInt().withMessage("El campo id_bitacora debe ser entero")   
],archivoBitacoraAlumnoController.subirArchivo)

routerArchivoAlumno.get("/getall/:id",
[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")
]
,archivoBitacoraAlumnoController.mostrar_archivos)

routerArchivoAlumno.delete("/delete/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")  
]
,archivoBitacoraAlumnoController.eliminar_archivo)


module.exports=routerArchivoAlumno;