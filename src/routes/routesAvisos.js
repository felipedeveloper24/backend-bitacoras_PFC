
const express = require("express");
const routerAvisos = express.Router();
const AvisoController = require("../controllers/avisoController");
const { body } = require("express-validator");

const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");

routerAvisos.post("/create",
[
    AutenticacionProfesional,
    body("mensaje").notEmpty().withMessage("El campo mensaje es requerido").isString().withMessage("El campo mensaje es requerido"),
    body("id_usuario").notEmpty().withMessage("El campo id_usurio es requerido").isInt().withMessage("El campo id_usuario es requerido")
],
AvisoController.crear_aviso);


module.exports=routerAvisos;