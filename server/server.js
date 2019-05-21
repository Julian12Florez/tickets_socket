const express=require('express');
const socketIO=require("socket.io");
const http=require('http');
const app=express();
const path=require('path');
const port=require('./../config/config');

let server=http.createServer(app);

const public_path=path.resolve(__dirname,'../public');

app.use(express.static(public_path))

// esta es la comunicación del backend, directo con el servidor
module.exports.io=socketIO(server);
require('./sockets/sockets');

server.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(`error ${error}`);
    }
    console.log(`Aplicación corriendo por el puerto ${process.env.PORT}`);
})