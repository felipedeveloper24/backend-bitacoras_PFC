
const {PrismaClient} = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();


const crear_inscripcion = async(req,res)=>{

    try{
      
        console.log(req.body)  
        const errors = validationResult(req);  
        if(!errors.isEmpty()){
            return res.status(400).json({
                    mensaje:"Se han encontrado errores",
                    errors:errors.array()
            })
        }
        
        const {fecha_inscripcion_practica,fecha_inicio,fecha_fin,id_inscribe,id_representante,id_oferta,id_estado_inscripcion, id_modalidad} = req.body;
        const formato_fecha = "T00:00:00Z";

        const inscripcion = await prisma.inscripcion_practica.create({
            data:{
                fecha_inscripcion_practica:`${fecha_inscripcion_practica}${formato_fecha}`,
                fecha_inicio:`${fecha_inicio}${formato_fecha}`,
                fecha_fin:`${fecha_fin}${formato_fecha}`,
                nota_final:0,
                id_inscribe,
                id_estado_inscripcion,
                id_modalidad,observaciones:"",
                id_oferta,
                id_representante
            }
        })
        if(!inscripcion){
            return res.status(400).json({
                mensaje: "Error al registrar inscripcion"
            })
        }
        return res.status(200).json({
            mensaje:"Inscripcion registrada correctamente",
            inscripcion:inscripcion
        })
    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            error: error.stack
        });
    }
}

const mostrar_inscripciones = async(req,res) =>{
    try{
        const inscripciones = await prisma.inscripcion_practica.findMany({
            include:{
                estado_inscripcion:true
            }
        })
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
                id_inscribe:Number(id)
            },
            include:{
                estado_inscripcion:true,
                representante:true,
                modalidad:true
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
                id_inscribe:Number(id)
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
        console.log(error.stack)
        return res.status(400).json({
            error: error.stack
        });
    }
};
const comprobar_inscripcion = async(req,res)=>{

    try{
        const {id_alumno} = req.body;
        //comprobamos si el alumno existe
        const alumno = await prisma.alumno.findFirst({
            where:{
                id_alumno:Number(id_alumno)
            }
        })
        if(!alumno){
            return res.status(400).json({
                mensaje:"El alumno no existe"
            })
        }
        //consultamos si tiene inscrita la practica desde intranet
        const inscribe = await prisma.inscribe.findFirst({
            where:{
                id_alumno:Number(id_alumno)
            }
        })
        if(!inscribe){
            return res.status(200).json({
                mensaje:"El alumno no tiene inscrita la práctica desde intranet",
                inscrito_intranet:false
            })
        }

        const inscripcion_sistema = await prisma.inscripcion_practica.findFirst({
            where:{
                id_inscribe:inscribe.id_inscripcion
            }
        })
        if(!inscripcion_sistema){
            return res.status(200).json({
                mensaje:"Por favor haga inscripción en el sistema",
                inscrito_sistema:false
            })
        }
        return res.status(200).json({
            mensaje:"Tiene su práctica inscrita correctamente en el sistema",
            inscrito_sistema:true
        })

    }catch(error){
        console.log(error.stack);
        return res.status(400).json({
            error: error.stack
        });
    }
}


const mostrar_listado_alumnos_practica1 = async(req,res)=>{
    try{
        //buscamos el perido academico
        const {anio,id_periodo} = req.body;
        const periodo = await prisma.periodo_academico.findFirst({
            where:{
                anio: Number(anio),
                periodo:Number(id_periodo)
            }
        })
        if(!periodo){
            return res.status(400).json({
                mensaje:"No existe el periodo"
            })
        }
        //Buscamos la sección que corresponde
        const seccion = await prisma.seccion.findFirst({
            where:{
                id_asignatura:620509
            }
        })
        if(!seccion){
            return res.status(400).json({
                mensaje:"Error al encontrar la sección"
            })
        }
        const inscribe = await prisma.inscribe.findMany({
            where:{
                id_seccion:Number(seccion.id_seccion),
                id_periodo_academico:Number(periodo.id_periodo_academico)
            },
            include:{alumno:true,periodo_academico:true}
        })
        if(!inscribe){
            return res.status(400).json({
                mensaje:"Error al encontrar la sección"
            })
        }
        return res.status(200).json({
            mensaje:"Se ha encontrado algo",
            inscribe:inscribe
        })
    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            error:error.stack
        })
    }
}
const mostrar_listado_alumnos_practica2 = async(req,res)=>{
    try{
        const {anio,id_periodo} = req.body;
        const periodo = await prisma.periodo_academico.findFirst({
            where:{
                anio: Number(anio),
                periodo:Number(id_periodo)
            }
        })
        //Buscamos la sección que corresponde
        const seccion = await prisma.seccion.findFirst({
            where:{
                id_asignatura:620520
            }
        })
        if(!seccion){
            return res.status(400).json({
                mensaje:"Error al encontrar la sección"
            })
        }
        const inscribe = await prisma.inscribe.findMany({
            where:{
                id_seccion:Number(seccion.id_seccion),
                id_periodo_academico:Number(periodo.id_periodo_academico)
            },
            include:{alumno:true,periodo_academico:true}
        })
        if(!inscribe){
            return res.status(400).json({
                mensaje:"Error al encontrar la sección"
            })
        }
        return res.status(200).json({
            mensaje:"Se ha encontrado algo",
            inscribe:inscribe
        })
    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            error:error.stack
        })
    }
}

const obtener_Modalidades = async(req,res) =>{
    try{
        const modalidades = await prisma.modalidad.findMany();
        if(modalidades.length==0){
            return res.status(200).json({
                mensaje:"No hay modalidades"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            modalidades:modalidades
        })
    }catch(error){
        return res.status(400).json({
            error:error.stack
        })
    }
}

const actualizar_representante = async(req,res) =>{
    try{
        const {id} = req.params;
        const {id_representante} = req.body;
        const inscripcion = await prisma.inscripcion_practica.findFirst({
            where:{
                id_inscribe:Number(id)
            }
        })
        console.log(inscripcion);
        if(!inscripcion){
            return res.status(400).json(
                {
                    mensaje:"La inscripcion no existe"
                }
            )
        }
        const actualiza = await prisma.inscripcion_practica.update({
            where:{
                id_inscripcion_practica:Number(inscripcion.id_inscripcion_practica)
            },
            data:{
                id_representante:Number(id_representante)
            }
        })
        if(!actualiza){
            return res.status(400).json(
                {
                    mensaje:"Error al actualizar"
                }
            )
        }
        return res.status(200).json({
            mensaje:"Inscripción actualizada correctamente"
        })
       
    }catch(error){
        return res.status(400).json({
            error:error.stack
        })
    }
}


const actualizar_inscripcion_alumno = async(req,res)=>{
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
                id_inscribe:Number(id)
            }
        })
        if(!inscripcion){
            return res.status(200).json({
                mensaje:"La inscripción no existe"
            })
        }
        const {fecha_inscripcion_practica,fecha_inicio,fecha_fin,id_inscribe,id_representante,id_oferta,id_estado_inscripcion, id_modalidad} = req.body;
        const formato_fecha = "T00:00:00Z";
        const inscripcion_actualizada = await prisma.inscripcion_practica.update({
            where:{
                id_inscripcion_practica: Number(inscripcion.id_inscripcion_practica)
            },
            data:{
                fecha_inscripcion_practica:`${fecha_inscripcion_practica}${formato_fecha}`,
                fecha_inicio:`${fecha_inicio}${formato_fecha}`,
                fecha_fin:`${fecha_fin}${formato_fecha}`,
                id_inscribe,
                id_estado_inscripcion,
                id_modalidad,
                id_oferta,
                id_representante
            }
        })

        return res.status(200).json({
            mensaje:"Inscripción actualizada correctamente",
            inscripcion_actualizada:inscripcion_actualizada
        });

    }catch(error){
        console.log(error.stack)
        return res.status(400).json({
            error: error.stack
        });
    }
};

module.exports={crear_inscripcion,
    mostrar_inscripciones,
    comprobar_inscripcion,
    mostrar_inscripcion,
    eliminar_inscripcion,
    actualizar_inscripcion,
    mostrar_listado_alumnos_practica1,
    mostrar_listado_alumnos_practica2,
    obtener_Modalidades,
    actualizar_representante,
    actualizar_inscripcion_alumno
}