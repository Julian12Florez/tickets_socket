const fs=require('fs')
class TicketControl{
    
    constructor() {
        this.ultimo=0;
        this.hoy=new Date().getDate();
        this.tickets=[];
        this.ultimos4=[];

        let data=require('../data/data.json');

        if (data.hoy===this.hoy) {
            this.ultimo=data.ultimo;
            this.tickets=data.tickets;
            this.ultimos4=data.ultimos4;
        }else{
            this.reiniciarConteo()
        }

    }

    siguiente(){
        this.ultimo+=1;
        let ticket= new Ticket(this.ultimo,null);
        this.tickets.push(ticket)
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    reiniciarConteo(){
        this.ultimo=0;
        this.tickets=[];
        this.ultimos4=[];
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    grabarArchivo(){
        let jsonData={
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
            }
    
            jsonData=JSON.stringify(jsonData)
            fs.writeFileSync('./server/data/data.json',jsonData)
    }

    atenderTicket(escritorio){  
        if (this.tickets.length===0) {
           return 'no hay tickets por atender';
        }

        let numeroTicket=this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket=new Ticket(numeroTicket,escritorio);
        this.ultimos4.unshift(atenderTicket);


        if(this.ultimos4.length>4){
            this.ultimos4.splice(-1,1)
        }
        this.grabarArchivo();

        return atenderTicket;
    }

    getUltimos4(){
        return this.ultimos4;
    }

}

class Ticket{
    constructor(numero,escritorio){
        this.numero=numero;
        this.escritorio=escritorio;
    }
}

module.exports={
    TicketControl
}