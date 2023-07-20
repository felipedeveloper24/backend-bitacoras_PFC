const {PrismaClient} = require ('@prisma/client')
const {validationResult} = require('express-validator')

const prisma = new PrismaClient()

const crear_archivo = async(req, res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
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
                id_bitacora:Number(id_bitacora)
            }
        })
        if(!archivojefe){
            return res.status(400).json({message:'Error, no se ha podido crear la bitácora'})
        }
        return res.status(200).json({message:'La bitácora se ha creado con éxito'})
    } catch (error) {
       
        return res.status(400).json({message:'Error, no se ha podido crear con éxito',
        error:error.stack})
    }
}
const mostrar_archivos_pdf = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id_bitacora} = req.body;
        const archivos = await prisma.archivo_bitacora_jefe_carrera.findMany({
            where:{
                id_bitacora: id_bitacora,
                tipo_archivo:"pdf"
            }
        })
        if(archivos.length == 0){
            return res.status(200).json({
                mensaje:"No hay registros de archivos"
            })
        }
        const archivos_reverse = archivos.reverse();
        return res.status(200).json({
            mensaje:"Se han encontrado archivos",
            archivos:archivos_reverse
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al subir el archivo",
            error:error.stack
        })
    }
}
const mostrar_imagenes = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id_bitacora} = req.body;
        const archivos = await prisma.archivo_bitacora_jefe_carrera.findMany({
            where:{
                id_bitacora: id_bitacora,
            }
        })
        if(archivos.length == 0){
            return res.status(200).json({
                mensaje:"No hay registros de archivos"
            })
        }
        let archivos_reverse = archivos.reverse();
        return res.status(200).json({
            mensaje:"Se han encontrado archivos",
            archivos:archivos_reverse
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al subir el archivo",
            error:error.stack
        })
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

module.exports = {crear_archivo, obtener_archivos, eliminar_archivo, mostrar_archivos_pdf,mostrar_imagenes}
