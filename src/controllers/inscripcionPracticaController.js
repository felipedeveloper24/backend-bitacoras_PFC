
const {PrismaClient} = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();


const crear_inscripcion = async(req,res)=>{

    try{
        const errors = validationResult(req);  
        if(!errors.isEmpty()){
            return res.status(400).json({
                    mensaje:"Se han encontrado errores",
                    errors:errors.array()
            })
        }
        const {fecha_inscripcion_practica,fecha_inicio,fecha_fin,id_inscribe,observaciones,id_representante,id_oferta,id_estado_inscripcion, id_modalidad} = req.body;
        const formato_fecha = "T00:00:00Z";

        const inscripcion = await prisma.inscripcion_practica.create({
            data:{
                fecha_inscripcion_practica:`${fecha_inscripcion_practica}${formato_fecha}`,
                fecha_inicio:`${fecha_inicio}${formato_fecha}`,
                fecha_fin:`${fecha_fin}${formato_fecha}`,
                nota_final:0,
                id_inscribe,
                id_estado_inscripcion,
                id_modalidad,observaciones,
                id_oferta,
                id_representante
            }
        })
        if(!inscripcion){
            return res.status(400).json({
                mensaje: "Error al registrar inscripcion"
            })
        }
        return res.status(201).json({
            mensaje:"Inscripcion registrada correctamente",
            inscripcion:inscripcion
        })
    }catch(error){
        return res.status(400).json({
            error: error.stack
        });
    }
}

const mostrar_inscripciones = async(req,res) =>{
    try{
        const inscripciones = await prisma.inscripcion_practica.findMany()
        if(inscripciones.length==0){
            return res.status(200).json({
                mensaje:"No existen registros de inscripciones"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado inscripciones",
            inscripciones:inscripciones
        })

    }catch(error){
        return res.status(400).json({
            error: error.stack
        });
    }
}
const mostrar_inscripcion = async(req,res) =>{
    try{
        const errors = validationResult(req);  
        if(!errors.isEmpty()){
            return res.status(400).json({
                    mensaje:"Se han encontrado errores",
                    errors:errors.array()
            })
        }
        const {id} = req.params;
        const inscripcion = await prisma.inscripcion_practica.findFirst({
            where:{
                id_inscripcion_practica:Number(id)
            }
        })
        if(!inscripcion){
            return res.status(200).json({
                mensaje:"No se ha encontrado la inscripcion"
            });
        }

        return res.status(200).json({
            mensaje:"Se ha encontrado la inscripcion",
            inscripcion:inscripcion
        })

    }catch(error){
        return res.status(400).json({
            error: error.stack
        });
    }
}

const eliminar_inscripcion = async(req,res) =>{
     try{
        const errors = validationResult(req);  
        if(!errors.isEmpty()){
            return res.status(400).json({
                    mensaje:"Se han encontrado errores",
                    errors:errors.array()
            })
        }
        const {id} = req.params;
        const inscripcion = await prisma.inscripcion_practica.findFirst({
            where:{
                id_inscripcion_practica:Number(id)
            }
        });
        if(!inscripcion){
            return res.status(200).json({
                mensaje:"No se ha encontrado la inscripcion"
            })
        }
        await prisma.inscripcion_practica.delete({
            where:{
                id_inscripcion_practica:Number(id)
            }
        })
        return res.status(200).json({
            mensaje:"La inscripción ha sido eliminada correctamente"
        })

     }catch(error){
        return res.status(400).json({
            error: error.stack
        });
     }
};

const actualizar_inscripcion = async(req,res)=>{
    try{
        const errors = validationResult(req);  
        if(!errors.isEmpty()){
            return res.status(400).json({
                    mensaje:"Se han encontrado errores",
                    errors:errors.array()
            })
        }
        const {id} = req.params;
        const inscripcion = await prisma.inscripcion_practica.findFirst({
            where:{
                id_inscripcion_practica:Number(id)
            }
        })
        if(!inscripcion){
            return res.status(200).json({
                mensaje:"La inscripción no existe"
            })
        }
        const {fecha_inscripcion_practica,fecha_inicio,fecha_fin,id_inscribe,observaciones,id_representante,id_oferta,id_estado_inscripcion, id_modalidad} = req.body;
        const formato_fecha = "T00:00:00Z";
        const inscripcion_actualizada = await prisma.inscripcion_practica.update({
            where:{
                id_inscripcion_practica: Number(id)
            },
            data:{
                fecha_inscripcion_practica:`${fecha_inscripcion_practica}${formato_fecha}`,
                fecha_inicio:`${fecha_inicio}${formato_fecha}`,
                fecha_fin:`${fecha_fin}${formato_fecha}`,
                nota_final:0,
                id_inscribe,
                id_estado_inscripcion,
                id_modalidad,observaciones,
                id_oferta,
                id_representante
            }
        })

        return res.status(200).json({
            mensaje:"Inscripción actualizada correctamente",
            inscripcion_actualizada:inscripcion_actualizada
        });

    }catch(error){
        return res.status(400).json({
            error: error.stack
        });
    }
};


module.exports={crear_inscripcion,mostrar_inscripciones,mostrar_inscripcion,eliminar_inscripcion,actualizar_inscripcion}