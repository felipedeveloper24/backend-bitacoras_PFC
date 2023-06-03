const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})
const routerArchivoJefe = express.Router()

const archivoBitacoraJefeController = require('../controllers/archivobitacora_jefecarrera_controllers');
const { body, param } = require("express-validator");
const { AutenticacionJefe } = require("../middlewares/verifyRolJefe");

routerArchivoJefe.post("/create",
[
    AutenticacionJefe,
    upload.single("archivo"),
    body("tipo_archivo").notEmpty().withMessage("El campo tipo_archivo es requerido").isInt().withMessage("El campo tipo_archivo debe ser entero"),
    body("id_bitacora").notEmpty().withMessage("El campo id_bitacora es requerido").isInt().withMessage("El campo id_bitacora debe ser entero")
],archivoBitacoraJefeController.crear_archivo)

routerArchivoJefe.get("/getall/:id",
[
    AutenticacionJefe,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")
]
,archivoBitacoraJefeController.obtener_archivos)

routerArchivoJefe.delete("/delete/:id",
[
    AutenticacionJefe,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")
]
,archivoBitacoraJefeController.eliminar_archivo)


module.exports=routerArchivoJefe;
