
const {PrismaClient} = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const subirArchivo = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {originalname,buffer} = req.file;
        const {tipo_archivo,id_bitacora} = req.body;
        const archivo = await prisma.archivo_bitacora_alumno.create({
            data:{
                nombre_archivo:originalname,
                tipo_archivo:tipo_archivo,
                id_bitacora:id_bitacora,
                archivo:buffer            
            }
        })
        
        if(!archivo){
            return res.status(400).json({
                mensaje:"Error al subir un archivo",
            })
        }
        return res.status(201).json({
            mensaje:"Archivo subido correctamente",
            archivo:archivo
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al subir el archivo",
            error:error.stack
        })
    }
};
const mostrar_archivos = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id_bitacora} = req.body;
        const archivos = await prisma.archivo_bitacora_alumno.findMany({
            where:{
                id_bitacora: id_bitacora
            }
        })
        if(archivos.length == 0){
            return res.status(200).json({
                mensaje:"No hay registros de archivos"
            })
        }
        return res.status.json({
            mensaje:"Se han encontrado archivos",
            archivos:archivos
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al subir el archivo",
            error:error.stack
        })
    }
}
const eliminar_archivo = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const archivo = await prisma.archivo_bitacora_alumno.findFirst({
            where:{
                id_archivo:Number(id)
            }
        })
        if(!archivo){
            return res.status(200).json({
                mensaje:"No se ha encontrado un archivo con ese id"
            })
        }
        await prisma.archivo_bitacora_alumno.delete({
            where:{
                id_archivo:Number(id)
            }
        })
        return res.status(200).json({
            mensaje:"El archivo ha sido eliminado correctamente"
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al subir el archivo",
            error:error.stack
        })
    }
}
module.exports = {subirArchivo,mostrar_archivos,eliminar_archivo}