
const jwt = require("jsonwebtoken");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const Login = async(req,res) =>{
    try{
        const {rut,contrasena} = req.body;
        const user = await prisma.usuario.findFirst({
            where:{
                rut,contrasena
            },
            include:{tipo_usuario:true}
        })
        if(!user){
            return res.status(401).json({
                mensaje:"Credenciales inválidas"
            })
        }
        const token = jwt.sign({
            rut:rut,
            contrasena:contrasena
        },process.env.JWT_SECRETO,{
            expiresIn:process.env.JWT_TIEMPO_EXPIRA
        })
        if(!token){
            return res.status(401).json({
                mensaje:"Credenciales inválidas"
            })
        }
   
        if(Number(user.tipo_usuario.id_tipo_usuario)==1){
            const alumno = await prisma.alumno.findFirst({
                where:{
                    rut
                }
            })
            if(!alumno){
                return res.status(401).json({
                    mensaje:"No existe el alumno"
                })
            }
            return res.status(200).json({
                mensaje:"Se ha logueado correctamente",
                token:token,
                rol: user.tipo_usuario.id_tipo_usuario,
                alumno:alumno
            })
        }
       
        return res.status(200).json({
            mensaje:"Se ha logueado correctamente",
            token:token,
            rol: user.tipo_usuario.id_tipo_usuario,
        })

    }catch(error){
        console.log(error.message)
        return res.status(400).json({
            mensaje:"Error al loguearse"
        })
    }
}
module.exports = {Login};