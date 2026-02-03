const express=require("express")
const app=express();
const cors=require("cors")
var axios = require('axios');
var qs = require('qs');

require("dotenv").config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{

  res.send("EnviarEmailPrueba")
})
app.post("/EnviarWasap",async(req,res)=>{


const body=req.body;

var Celular=body.Celular;
var Paciente=body.Paciente;
var Monto=body.Monto;
var Especialidad=body.Especialidad;
var HorarioInicio=body.HorarioInicio
var HorarioFin=body.HorarioFin
var Fecha=body.Fecha;

var data =await qs.stringify({
    "token": process.env.KEY,
    "to": `+51${Celular}`,
    "body": `¡Hola 👨‍💼 ${Paciente}-${Monto}-${Especialidad}-${HorarioInicio}-${HorarioFin}-${Fecha} *! 👋Gracias por confiar en nosotros para cuidar de tu salud *Descripción:`
    
});
console.log(data)
var config = {
  method: 'post',
  url: 'https://api.ultramsg.com/instance160710/messages/chat',
  headers: {  
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));

  res.send({

   Estado:1,
   mensaje:"Enviado correctamente el mensaje"

  })
})
.catch(function (error) {
  console.log(error);
  res.send({
    Estado:0,
    mensaje:"Error al enviar el mensaje"
    


  })
});



})


app.listen(5000,()=>{

    console.log("Recorreindo en el puerto 5000")
})