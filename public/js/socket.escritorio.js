
var socket =io();

var searchParams= new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location='index.html'
    throw new Error('El escritorio es necesario');
}


var escritorio=searchParams.get('escritorio')
console.log(escritorio);
$('h1').text('Escritorio '+escritorio)

$('button').on('click',function () {
    
    socket.emit('atenderTicket',{escritorio},function(resp){
        console.log(resp);
        if (resp==="no hay tickets por atender") {
            alert(resp)
            return;
        }
        $('small').text(resp.numero)
    })

})