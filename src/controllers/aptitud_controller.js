
const {PrismaClient} = require('@prisma/client')
const {validationResult } = require('express-validator')

const prisma = new PrismaClient()


const obtener_aptitudes = async(req, res)=>{
    try {
        const aptitudes = await prisma.aptitud.findMany()
        if(aptitudes.length === 0){
            return res.status(200).json({message:'Error, no existe lista de aptitudes'})
        }
        return res.status(200).json({
            message:'Se han encontrado con éxito las aptitudes',
            aptitudes:aptitudes
        })
        
    } catch (error) {
        return res.status(400).json({message:'Error, no se ha encontrado'})
    }
}

module.exports = {obtener_aptitudes}
// const crear_aptitud = async (req, res)=>{
// try {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json(
//             {message: 'Se han encontrado errores', errors: errors.array()})
//     }
//     const {nombre_aptitud} = req.body
//     const aptitud = await prisma.aptitud.get({
//         data:{
//             nombre_aptitud: nombre_aptitud
//         }
//     })
//     if(!aptitud){
//         return res.status(400).json({message:'No se ha podido añadir tu aptitud'})
//     }
//         return res.status(200).json({message:'Tu aptitud se ha añadido correctamente'})
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({message:'No se ha podido añadir tu aptitud'})
//     }
// }

// module.exports = {crear_aptitud}
