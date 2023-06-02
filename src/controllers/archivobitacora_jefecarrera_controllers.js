const {PrismaClient} = require ('@prisma/client')
const validationResult = require('express-validator')

const prisma = new PrismaClient()


const crear_archivo = async(req, res) =>{
    try {
        const errors = validationResult(req)
        if(errors.isEmpty()){
            return res.status(400).json({message:'Se han encontrado errores',
        errors: errors.array()})
        }
        const {originalname, buffer} = req.file;
        const {tipo_archivo, id_bitacora} = req.body
        const archivojefe = await prisma.archivo_bitacora_jefe_carrera.create({
            data:{
                nombre_archivo: originalname,
                tipo_archivo:tipo_archivo,
                archivo:buffer,
                id_bitacora:id_bitacora
            }
        })
        if(!archivojefe){
            return res.status(400).json({message:'Error, no se ha podido crear la bitácora'})
        }
        return res.status(200).json({message:'La bitácora se ha creado con éxito'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'Error, no se ha podido crear con éxito',
        error:error.stack})
    }
}


const obtener_archivos = async(req,res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id_bitacora} = req.body;
        const archivos_bitacoras = await prisma.archivo_bitacora_jefe_carrera.findMany({
            where:{
                id_bitacora: id_bitacora
            }
        })
        if(archivos_bitacoras.length == 0){
            return res.status(200).json({message:'Error, no existen bitácoras'})
        }
        return res.status(200).json({message:'Se han encontrado estas bitácoras', archivos_bitacoras:archivos_bitacoras})
    } catch (error) {
        // console.error
        return res.status(400).json({message:'Error, no se han podido obtener las bitácoras', error:error.stack})
    }
}

// const obtener_archivo_unaBitacora_jefecarrera = async (req, res) =>{
//     try {
//         const {id} = req.params
//         const bitacora = await prisma.bitacora_jefe_carrera.findFirst({
//             where:{
//                 id_bitacora: Number(id)
//             }
//         })
//         if(!bitacora){
//             return res.status(200).json({message:'No existe una bitácora con este ID'})
//         }
//         return res.status(200).json({
//             message:'Se ha encontrado con éxito la bitácora', bitacora:bitacora
//         })
//     } catch (error) {
//         return res.status(400).json({message:'Error, no se ha encontrado',
//     error:error.stack})
//     }
// }


const eliminar_archivo = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(200).json({message:'Se ha encontrado un error', errors:errors.array()})
        }
        const {id} = req.params;
        const archivo = await prisma.archivo_bitacora_jefe_carrera.findFirst({
            where:{
                id_archivo:Number(id)
            }
        })
        if(!archivo){
            return res.status(400).json({message:'No se ha encontrado ningún archivo con este ID'})
        }
        await prisma.archivo_bitacora_jefe_carrera.delete({
            where:{id_archivo:Number(id)}
        })
        return res.status(200).json({message:'Se ha eliminado con éxito'
        })

    } catch (error) {
        // console.error
        return res.status(400).json({message:'Error, no se ha podido eliminar',
    error:error.stack})
    }
}

// const actualizar_archivo_bitacoras_jefecarrera = async (req, res) => {
//     try {
//         const errors = validationResult(req)
//         if(!errors.isEmpty()){
//             return res.status(200).json({message:'Se han encontrado errores', errors:errors.array()})
//         }
//         const {id} = req.params
//         const {nombre_archivo, tipo_archivo, archivo, id_bitacora} = req.body
//         const bitacora = await prisma.archivo_bitacora_jefe_carrera.findFirst({
//             id_bitacora:Number(id)
//         })
//         if(!bitacora){
//             return res.status(200).json({message:'Error, no se ha encontrado'})
//         }
//         const actualizar = await prisma.archivo_bitacora_jefe_carrera.update({
//             where:{
//                 id_bitacora:Number(id)
//             },
//             data:{
//                 nombre_archivo, tipo_archivo,archivo, id_bitacora
//             }
//         })
//         if(!actualizar){
//             return res.status(400).json({message:'Error al actualizar las bitácoras'})
//         }
//         return res.status(200).json({message:'Se ha actualizado la bitácora', actualizar:actualizar})
//     } catch (error) {
//         console.error
//         return res.status(400).json({message:'Error al actualizar', error:error.stack})
//     }
// }
module.exports = {crear_archivo, obtener_archivos, eliminar_archivo}
