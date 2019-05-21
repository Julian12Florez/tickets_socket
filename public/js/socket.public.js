var socket=io();


socket.on('estadoActual',function(resp){
   recorrerArray(resp.ultimos4)
})

socket.on('ultimos_tickets',(data)=>{
    var audio=new Audio('audio/new-ticket.mp3');
    audio.play();
    recorrerArray(data.ultimos4)
})

let appendTickets=(id,value)=>{
    $(`#${id}`).text(value)
}

let recorrerArray=(array)=>{
    for (let index = 0; index <  array.length; index++) {
        appendTickets(`lblTicket${index+parseInt(1)}`,`Ticket ${array[index].numero}`)
        appendTickets(`lblEscritorio${index+parseInt(1)}`,`Escritorio ${array[index].escritorio}`)
        
    }
}