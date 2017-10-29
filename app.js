var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [
    {
        id: 1,
        text: 'Wellcome!!',
        author:'Server Node'
    }
]


var config = require('./config') 

app.set('port',config.port);
app.use(express.static('public'));


app.get('/', function(req, res){
    res.status(200).send({
        'Messsage':'App Works!!!'
    });
});

io.on('connection', (socket)=>{
    console.log('Someone has connected by sockets');
    socket.emit('messages', messages)

    socket.on('new-message', (data) =>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    }); 
})

server.listen(config.port, ()=>{
    console.log(`Server listen on ${config.domain}:${config.port}`)
})
