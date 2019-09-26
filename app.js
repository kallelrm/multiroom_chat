//importar as configurações do servidor
const app = require('./config/server');

//parametrizar a porta de escuta
let server = app.listen(3000, function(){
    console.log("Servidor online");
})

//importando o socket.io e fazendo o módulo esctutar na mesma porta do app
let io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data){
        
        //dialogo
        socket.emit(
            'msgParaClient', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );
        socket.broadcast.emit(
            'msgParaClient', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        //participantes
        socket.emit(
            'participantesParaCliente', 
            { apelido: data.apelido }
        );
        socket.broadcast.emit(
            'participantesParaCliente', 
            { apelido: data.apelido }
        );
    })
});