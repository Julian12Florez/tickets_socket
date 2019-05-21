
var socket=io();

socket.on('connect',function(err){
    if(err) throw new Error;
    console.log('conectado al servidor');
})

socket.on('disconnect',function () {
    console.log('desconectado al servidor');
})

$('button').on('click',function () {
    socket.emit('siguiente_ticket',null,function(siguiente_ticket){
        appendLabel('lblNuevoTicket',siguiente_ticket)
    })
})

socket.on('estadoActual',function (estadoActual) {
    appendLabel('lblNuevoTicket',estadoActual.actual)
})

let appendLabel=(label,value)=>{
    $(`#${label}`).text(value)
}