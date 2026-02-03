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
console.log(body)
var data =await qs.stringify({
    "token": process.env.KEY,
    "to": `+51${body.Celular}`,
    "body": `<div style="font-family: Arial; max-width: 500px; margin: 20px auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
              <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; text-align: center;">
                  <h2 style="margin: 0;">Hola ${body.Nombres} ${body.Apellidos}</h2>
              </div>
              <div style="padding: 20px;">
                  <div style="color: #667eea; font-size: 12px; font-weight: bold; margin-bottom: 5px;">DESCRIPCIÓN</div>
                  <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; border-left: 3px solid #667eea;">
                      ${body.Informacion}
                  </div>
              </div>
            </div>`
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