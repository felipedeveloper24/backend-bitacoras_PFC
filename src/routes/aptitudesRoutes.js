const express = require('express')
const aptitudesControllers = require('../controllers/aptitud_controller')
const {body} = require('express-validator')
const routerAptitud = express.Router()

routerAptitud.get('/getAll', aptitudesControllers.obtener_aptitudes)


// routerAptitud.get('/create', [
//     body('nombre_aptitud').notEmpty().withMessage('El campo nombre_aptitud es requerido').isString().withMessage('El campo nombre_aptitud debe ser un string').isLength({ max: 50 })
// ]  , aptitudesControllers.obtener_aptitudes)

module.exports = routerAptitud;