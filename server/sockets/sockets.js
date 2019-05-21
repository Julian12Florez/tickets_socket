const {io}=require('../server');
const {TicketControl}=require('../classes/ticket-control')

const ticketControl= new TicketControl();

io.on('connection',(client)=>{
    console.log(`usuario conectado`);

    client.emit('enviar_mensaje',{
        usuario:'Administrador',
        mensaje:'Bienvenido a esta aplicación'
    });

    client.on('disconnect',()=>{
        console.log('usuario desconectado');
    })

    // escuchar el cliente
    client.on('enviar_mensaje',(mensaje,callback)=>{
        console.log(mensaje);
        client.broadcast.emit('enviar_mensaje',mensaje)
        // if(mensaje.usuario){
        //     callback({
        //         status:true,
        //         message:'usuario en la petición'
        //     });
        // }else{
        //     callback({
        //         status:false,
        //         message:'sin usuario en la petición'
        //     })
        // }
    });


    client.on('siguiente_ticket',(data,callback)=>{
        let siguiente_ticket=ticketControl.siguiente();
        callback(siguiente_ticket)
        // client.emit('siguiente_ticket',siguiente_ticket);
    })

    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
    })

    client.on('atenderTicket',(data,callback)=>{
        if (!data.escritorio) {
           return  callback({
               err:true,
               mensaje:'El escritorio es necesario'
           })
        }

        let atenderTicket=ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos_tickets',{
            actual:ticketControl.getUltimoTicket(),
            ultimos4:ticketControl.getUltimos4()
        })
        callback(atenderTicket)

    })

})