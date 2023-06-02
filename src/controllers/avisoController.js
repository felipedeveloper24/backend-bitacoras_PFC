
const {PrismaClient} = require("@prisma/client");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const prisma = new PrismaClient();

const crear_aviso = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const diaActual = String(fechaActual.getDate()).padStart(2, '0');
        const fechaActualFormateada = `${anioActual}-${mesActual}-${diaActual}T00:00:00Z`;
        const {mensaje,id_usuario} = req.body;
        const aviso = await prisma.aviso.create({
                data:{
                    mensaje,
                    fecha_creacion: fechaActualFormateada,
                    id_usuario
                }
        })
        if(!aviso){
            return res.status(400).json({
                mensaje:"Error al enviar el aviso"
            })
        }

        enviar_email(mensaje)

        return res.status(200).json({
            mensaje:"Aviso registrado correctamente",
            aviso:aviso
        })

    }catch (error) {
        console.log(error.message);
         return res.status(400).json({
            mensaje:"Error al registrar aviso",
            error:error.stack
        })
    }

}

const enviar_email =  (mensaje) =>{
    const mailOptions = {
        from: "felipeopazo2409@gmail.com",
        to: "felipeopazo2409@gmail.com",
        subject: "Aviso",
        text: mensaje
      };
      
      const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: "felipeopazo2409@gmail.com",
                  pass: "iwufywhdinctplxv"
              }
      });
      
      transporter.sendMail(mailOptions,function(error,info){
           if (error) {
              console.log(error);
          } else {
              console.log("Correo electrónico enviado: " + info.response);
          }
      });
}   

module.exports={
    crear_aviso
}
