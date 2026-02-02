const express=require("express")
const app=express();
const cors=require("cors")
var axios = require('axios');
var qs = require('qs');

require("dotenv").config();

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{

  res.send("EnviarEmailPrueba")
})
app.post("/EnviarWasap",(req,res)=>{


const body=req.body;

var data = qs.stringify({
    "token": process.env.KEY,
    "to": `+51${body.Celular}`,
    "body": `hola ${body.Nombres}-${body.Apellidos} tu descripcion es ${body.Informacion}`
});

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