
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
        console.log(req.body);
        const {originalname,buffer} = req.file;
        const {tipo_archivo,id_inscripcion} = req.body;
        const archivo = await prisma.archivo_inscripcion.create({
            data:{
                nombre:originalname,
                tipo_archivo:tipo_archivo,
                id_inscripcion:Number(id_inscripcion),
                archivo:buffer            
            }
        })
        
        if(!archivo){
            return res.status(400).json({
                mensaje:"Error al subir un archivo",
            })
        }
        return res.status(200).json({
            mensaje:"Archivo subido correctamente",
            archivo:archivo
        })

    }catch(error){
        console.log(error.stack)
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
        const {id_inscripcion} = req.body;
        const archivos = await prisma.archivo_inscripcion.findMany({
            where:{
                id_inscripcion: id_inscripcion
            }
        })
        if(archivos.length == 0){
            return res.status(200).json({
                mensaje:"No hay registros de archivos"
            })
        }
        return res.status(200).json({
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
        const archivo = await prisma.archivo_inscripcion.findFirst({
            where:{
                id_archivo:Number(id)
            }
        })
        if(!archivo){
            return res.status(200).json({
                mensaje:"No se ha encontrado un archivo con ese id"
            })
        }
        await prisma.archivo_inscripcion.delete({
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