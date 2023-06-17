const {PrismaClient} = require('@prisma/client')
const {validationResult} = require('express-validator')

const prisma = new PrismaClient();


const crear_bitacoraJefe = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:'se han encontrado errores', errors: errors.array()})
        }
        const { titulo, descripcion, fecha_creacion, hora_inicio, hora_fin, id_tipo_bitacora, id_estado_bitacora, id_usuario } = req.body;
        const formato_fecha = "T00:00:00Z";
        const hora_inicio_formateada = `${fecha_creacion}T${hora_inicio}Z`
        const hora_fin_formateada = `${fecha_creacion}T${hora_fin}Z`
        const bitacorajefe = await prisma.bitacora_jefe_carrera.create({
            data:{
                titulo,
                descripcion,
                fecha_creacion:`${fecha_creacion}${formato_fecha}`,
                hora_inicio: hora_inicio_formateada,
                hora_fin: hora_fin_formateada,
                id_estado_bitacora, id_usuario, id_tipo_bitacora
            }
        })
        if(!bitacorajefe){
            return res.status(400).json({
                mensaje:"Error al registrar la bitacora del jefe de carrera"
            });
        }
        return res.status(200).json({
            mensaje:"Bitacora del jefe de carrera creada exitosamente",
            bitacorajefe:bitacorajefe
        })
    } catch (error) {
        return res.status(400).json({
            error:error.stack
        })
    }
};


const mostrar_bitacorasJefe = async (req, res) => {
    try {
        const bitacojefe = await prisma.bitacora_jefe_carrera.findMany();
        if(bitacojefe.length==0){
            return res.status(200).json({
                mensaje: "No se han encontrado registros de bitácoras del jefe de carrera"
            });
        }
        return res.status(200).json({
            message:'Se han encontrado los registros de bitácoras del jefe de carrera', bitacojefe:bitacojefe
        })
    } catch (error) {
        return res.status(400).json({
            error:error.stack
        })

    }
}

const mostrar_bitacoraJefe = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const bitacora = await prisma.bitacora_jefe_carrera.findFirst({
            where:{
                id_bitacora:Number(id)
            }
        })
        if(!bitacora){
            return res.status(200).json({
                mensaje:"No existe una bitácora jefe de carrera con este ID"
            })
        }
        return res.status(200).json({
            mensaje:"Se ha encontrado una bitácora del jefe de carrera",
            bitacora:bitacora
        })

    }catch(error){
        return res.status(400).json({
            error:error.stack
        })
    }
}

const eliminar_bitacoraJefe = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const bitacoraJefe = await prisma.bitacora_jefe_carrera.findFirst({
            where:{
                id_bitacora:Number(id)
            }
        })
        if(!bitacoraJefe){
            return res.status(200).json({
                mensaje:"No existe una bitácora con ese id"
            })
        }
        await prisma.bitacora_jefe_carrera.delete({
            where:{
                id_bitacora:Number(id)
            }
        })
        return res.status(200).json({
            mensaje:"Se ha eliminado correctamente",
        })
    }catch(error){
        return res.status(400).json({
            error:error.stack
        })
    }
};

const actualizar_bitacoraJefe = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }

        const {id} = req.params;
        const bitacoraJefe = await prisma.bitacora_alumno.findFirst({
            where:{
                id_bitacora:Number(id)
            }
        })
        if(!bitacoraJefe){
            return res.status(200).json({
                mensaje:"No existe una bitacora con ese id"
            });
        }
        const { titulo, descripcion, fecha_creacion, hora_inicio, hora_fin, id_tipo_bitacora, id_estado_bitacora, id_usuario } = req.body;
        const formato_fecha = "T00:00:00Z";
        const hora_inicio_formateada = `${fecha_creacion}T${hora_inicio}Z`
        const hora_fin_formateada = `${fecha_creacion}T${hora_fin}Z`
        const bitacora_actualizada = await prisma.bitacora_alumno.update({
            where:{
                id_bitacora:Number(id)
            },
            data:{
                titulo,
                descripcion,
                fecha_creacion:`${fecha_creacion}${formato_fecha}`,
                hora_inicio: hora_inicio_formateada,
                hora_fin: hora_fin_formateada,
                id_estado_bitacora, id_usuario, id_tipo_bitacora
            }
        })

        return res.status(200).json({
            mensaje:"Bitacora creada exitosamente",
            bitacora:bitacora_actualizada
        })

    }catch(error){

        return res.status(400).json({
            error:error.stack
        })
    }
};

module.exports = {crear_bitacoraJefe, mostrar_bitacoraJefe, mostrar_bitacorasJefe, eliminar_bitacoraJefe, actualizar_bitacoraJefe}